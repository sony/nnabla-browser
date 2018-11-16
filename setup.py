from setuptools import setup, find_packages

setup(
    name="nnablabrowser",
    version="0.1.0b",
    description="A browser base visualizer for Neural Network Libraries (nnabla).",
    # url=...,
    author="Akio Hayakawa",
    # license=...,
    classifiers=[
        # How mature is this project? Common values are
        #   3 - Alpha
        #   4 - Beta
        #   5 - Production/Stable
        'Development Status :: 3 - Alpha',

        # Indicate who your project is intended for
        'Intended Audience :: Developers',
        'Topic :: Neural Network framework :: Visualization Tools',

        # Pick your license as you wish (should match "license" above)
        # todo:  'License :: OSI Approved :: MIT License',

        # Specify the Python versions you support here. In particular, ensure
        # that you indicate whether you support Python 2, Python 3 or both.
        # todo: check python version compatibility
        # 'Programming Language :: Python :: 2',
        # 'Programming Language :: Python :: 2.6',
        # 'Programming Language :: Python :: 2.7',
        # 'Programming Language :: Python :: 3',
        # 'Programming Language :: Python :: 3.2',
        # 'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.6',
    ],
    install_requires=[
        # todo: fix versions?
        "gevent",
        "flask",
        "watchdog",
        "google",
        "protobuf",
        "numpy",
        "nnabla"
    ],
    python_requires="~=3.6",
    packages=find_packages(),
    entry_points={
        "console_scripts": [
            "nnabla-browser = nnabla_browser.server:main"
        ]
    }

)