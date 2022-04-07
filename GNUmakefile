# Copyright 2022 Sony Group Corporation.
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

NNABLA_BROWSER_BUILD_ENV_DOCKER_IMAGE_NAME=nnabla-browser-build

DOCKER_BUILD_ARGS = --build-arg HTTP_PROXY=${http_proxy}
DOCKER_BUILD_ARGS += --build-arg HTTPS_PROXY=${https_proxy}
DOCKER_BUILD_ARGS += --build-arg http_proxy=${http_proxy}
DOCKER_BUILD_ARGS += --build-arg https_proxy=${https_proxy}

DOCKER_RUN_OPTS = --rm
DOCKER_RUN_OPTS += -v $$(pwd):${HOME}
DOCKER_RUN_OPTS += -w ${HOME}
DOCKER_RUN_OPTS += -u $$(id -u):$$(id -g)
DOCKER_RUN_OPTS += -v /tmp/docker.passwd:/etc/passwd:ro
DOCKER_RUN_OPTS += -v /tmp/docker.group:/etc/group:ro
DOCKER_RUN_OPTS += -e http_proxy=${http_proxy}
DOCKER_RUN_OPTS += -e https_proxy=${https_proxy}

.PHONY:nnabla-browser-build-env
nnabla-browser-build-env:
	docker build $(DOCKER_BUILD_ARGS) -f docker/development/Dockerfile.build -t $(NNABLA_BROWSER_BUILD_ENV_DOCKER_IMAGE_NAME) .

.PHONY:nnabla-browser-wheel
nnabla-browser-wheel:
	npm install
	npm build
	python3 setup.py bdist_wheel

.PHONY:bwd-nnabla-browser-wheel
bwd-nnabla-browser-wheel:nnabla-browser-build-env
	getent passwd > /tmp/docker.passwd
	getent group > /tmp/docker.group
	docker run $(DOCKER_RUN_OPTS) $(NNABLA_BROWSER_BUILD_ENV_DOCKER_IMAGE_NAME) make nnabla-browser-wheel
