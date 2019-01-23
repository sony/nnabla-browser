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
        'Programming Language :: Python :: 3.5',
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
    # python_requires=">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*, !=3.4.*, <=3.6.5",
    python_requires=">=3.5, <=3.6.5",
    package_dir={
        "nnabla_browser": "src",
        "nnabla_browser/python_modules": "src/python_modules",
        'nnabla_browser/editor': 'src/editor'},
    packages=["nnabla_browser", "nnabla_browser/python_modules", "nnabla_browser/editor"],
    package_data={
        'nnabla_browser/editor': ['*', "dist/*", "image/*.svg", "lib/css/*.css", "lib/fonts/*", "lib/js/*.js"],
        'nnabla_browser/python_modules': ["nnabla_core/*"]
    },
    entry_points={
        "console_scripts": [
            "nnabla-browser = nnabla_browser.server:main"
        ]
    }
)
