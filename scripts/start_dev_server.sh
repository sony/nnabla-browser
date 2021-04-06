# (202104041) Using flask cli causes unstable behavior for SSE responce.
# export FLASK_APP="nnabla_browser/server.py"
export FLASK_ENV="development"

python nnabla_browser/server.py --port 8888 --logdir ./logdir