from setuptools import setup, find_packages

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
        # todo: fix versions?
        "gevent",
        "flask",
        "watchdog",
        "google",
        "protobuf",
        "numpy",
        "nnabla"
    ],
    python_requires=">=3.5",
    package_dir={"nnabla_browser": "nnabla_browser"},
    packages=["nnabla_browser"],
    package_data={'nnabla_browser': ["nnabla_core/*"]}, # TODO: include built JS
    entry_points={
        "console_scripts": [
            "nnabla-browser = nnabla_browser.server:main"
        ]
    }
)
