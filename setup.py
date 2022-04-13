# Copyright 2018,2019,2020,2021 Sony Corporation.
# Copyright 2021,2022 Sony Group Corporation.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from setuptools import setup
import glob

# get webpack outputs
pkg_dirs = glob.glob('nnabla_browser/dist/**/', recursive=True)
pkg_data = [f'{x.lstrip("nnabla_browser/")}*' for x in pkg_dirs]

setup(
    name="nnabla-browser",
    version="0.1.0b",
    description="A browser base visualizer for Neural Network Libraries (nnabla).",
    url='https://github.com/sony/nnabla-browser',
    author="Akio Hayakawa",
    # license=...,
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Neural Network framework :: Visualization Tools',
        'Programming Language :: Python :: 3.6',
    ],
    install_requires=[
        "gevent",
        "flask",
        "flask_cors",
        "watchdog",
        "google",
        "protobuf",
        "numpy",
        "pyyaml",
        "requests",
        "nnabla"
    ],
    python_requires=">=3.6",
    packages=["nnabla_browser"],
    package_data={'nnabla_browser': pkg_data},
    include_package_data=True,
    entry_points={
        "console_scripts": [
            "nnabla-browser = nnabla_browser.server:main"
        ]
    }
)
