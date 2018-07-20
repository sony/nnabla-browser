var nnc = Object.assign(nnc || {}, {
    emptyConfiguration: {
        networks: [
            {
                name: "Main",
                nodes: [],
                links: [],
            }
        ],
        datasets: [
            {
                id: "",
                name: "Training",
                original_name: "",
                tobe_shuffled: true,
                tobe_cached: true,
                tobe_normalized_image: true,
                samples: 0,
                columns: 0,
                tenant_id: '',
            },
            {
                id: "",
                name: "Validation",
                original_name: "",
                tobe_shuffled: false,
                tobe_cached: true,
                tobe_normalized_image: true,
                samples: 0,
                columns: 0,
                tenant_id: '',
            },
        ],
        main_dataset_name: "Training",
        description: "",
        epoch: 100,
        batch: 64,
        save_best: true,
        structure_search: {
            enable: false,
            method: "Random",
            optimize_for: "Error and Calculation",
            validation_min: -1,
            validation_max: -1,
            multiply_add_min: -1,
            multiply_add_max: -1,
            early_stopping: false,
            time_limit: "",
        },
        optimizers: [
            {
                name: "Optimizer",
                network: "Main",
                dataset: "Training",
                weight_decay: 0,
                learning_rate_multiplier: 1,
                update_interval: 1,
                updater: {
                    interval: 1,
                    name: "Adam",
                    parameters: [
                        {
                            _id: "alpha",
                            name: "Alpha",
                            value: "0.001",
                        },
                        {
                            _id: "beta1",
                            name: "Beta1",
                            value: "0.9",
                        },
                        {
                            _id: "beta2",
                            name: "Beta2",
                            value: "0.999",
                        },
                        {
                            _id: "epsilon",
                            name: "Epsilon",
                            value: "1e-08",
                        }
                    ]
                }
            }
        ],
        monitors: [
            {
                name: "train_error",
                network: "MainValidation",
                dataset: "Training",
            },
            {
                name: "valid_error",
                network: "MainValidation",
                dataset: "Validation",
            }
        ],
        executors: [
            {
                name: "Executor",
                network: "MainRuntime",
                dataset: "Validation",
                number_of_evaluation: 1,
                adopt_result: "mean",
                back_propagation: false,
            }
        ],
    }
});
