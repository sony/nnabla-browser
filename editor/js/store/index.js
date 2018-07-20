import Vue from 'vue/dist/vue.esm.js';
import Vuex from 'vuex';
import csvtojson from 'csvtojson';
const fs = require('fs');
const path = require('path');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        projects: [],
        datasets: [],
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        createProject(state, project) {
            project.id = state.projects.length ? state.projects[state.projects.length - 1].id + 1 : 1;
            state.projects.push(project);
        },
        setDatasets(state, datasets) {
            state.datasets = datasets;
        },
    },
    actions: {
        loadProjects({commit, state}) {
            return new Promise((resolve, reject) => {
                resolve({projects: [], datasets: state.datasets});
                // storage.get('store', (error, data) => {
                    // if (error) {
                    //     storage.set('store', {projects: [], datasets: state.datasets}, (error) => {
                    //         if (error) reject(error);
                    //     });
                    // } else {
                    //     const projects = JSON.parse(data).projects;
                    //     commit('setProjects', projects);
                    //     resolve(projects);
                    // }
                // });
            });
        },
        addProject({commit, state}, project) {
            return new Promise((resolve, reject) => {
                commit('createProject', project);
                fs.writeFile(project.path, window.exportProject(window.nnc.emptyConfiguration), (error) => {
                    if (error) reject(error);
                });
                // storage.set('store', JSON.stringify({projects: state.projects, datasets: state.datasets}), (error) => {
                //     if (error) reject(error);
                // });
                resolve(project);
            });
        },
        saveConfiguration({commit, state}, {project, configuration}) {
            return new Promise((resolve, reject) => {
                fs.writeFile(project.path, JSON.stringify(configuration), (error) => {
                    if (error) reject(error);
                });
                resolve(configuration);
            });
        },
        loadConfiguration({commit}, project) {
            return new Promise((resolve, reject) => {
                if (project) {
                    fs.readFile(project.path, 'utf8', (error, data) => resolve(JSON.parse(data)));
                } else {
                    reject();
                }
            });
        },
        setSampleDatasets({commit, state}) {
            return new Promise((resolve, reject) => {
                const sampleDatasetPath = path.resolve('') + '/nnabla-sample-data/console_prototype_sample/sample_dataset/MNIST';
                const sampleDatasets = [
                    {
                        name: 'small_mnist_4or9_test.csv',
                        samples: 500,
                        columns: 2,
                        csv_header: 'x:image, y:9',
                        path: sampleDatasetPath,
                    },
                    {
                        name: 'small_mnist_4or9_training.csv',
                        samples: 1500,
                        columns: 2,
                        csv_header: 'x:image, y:9',
                        path: sampleDatasetPath,
                    },
                    {
                        name: 'mnist_training.csv',
                        samples: 60000,
                        columns: 2,
                        csv_header: 'x:image, y',
                        path: sampleDatasetPath,
                    },
                    {
                        name: 'mnist_test.csv',
                        samples: 10000,
                        columns: 2,
                        csv_header: 'x:image, y',
                        path: sampleDatasetPath,
                    },
                ];
                // storage.set('store', JSON.stringify({projects: state.projects, datasets: sampleDatasets}), (error) => {
                //     if (error) reject(error);
                // });
                commit('setDatasets', sampleDatasets);
                resolve(sampleDatasets);
            });
        },
        getDatasetTable({commit, state}, request) {
            return new Promise((resolve, reject) => {
                const {dataset, offset, limit} = request;
                const originalDataset = state.datasets.find((_dataset) => dataset.original_name === _dataset.name && dataset.file_location === _dataset.path);
                if (originalDataset) {
                    const datasetPath = path.join(originalDataset.path, originalDataset.name);
                    fs.readFile(datasetPath, {encoding: 'utf-8'}, (error, data) => {
                        if (error) reject(error);
                        const result = {
                            dataset: {
                                csv_header: '',
                                result: [],
                            },
                        };
                        csvtojson()
                            .fromString(data)
                            .on('header', (header) => {
                                result.dataset.csv_header = header.join();
                            })
                            .on('csv', (row, rowIndex) => {
                                if (offset <= rowIndex && rowIndex < offset + limit) {
                                    result.dataset.result.push(row.map((column) => {
                                        if (column.endsWith('.png')) {
                                            const data = fs.readFile(path.join(originalDataset.path, column), 'base64');
                                            return {
                                                type: 'image/png',
                                                data: data,
                                            };
                                        } else {
                                            return {
                                                type: 'text/plain',
                                                data: column,
                                            };
                                        }
                                    }));
                                }
                            })
                            .on('done', (error) => {
                                if (error) reject(error);
                                resolve(result);
                            });
                    });
                }
            });
        },
    },
});
