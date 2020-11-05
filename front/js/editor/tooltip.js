/**
 * ツールチップを定義する
 */
const tooltip = () => {
    /**
     * ツールチップ
     */
    const _projectsEditor = {
        ja: {
            network: {
                component: {
                    io: 'ネットワークのI/Oです．',
                    input: 'ネットワークの入力です．',
                    output: 'ネットワークの出力です．',
                    basic: '基本レイヤーです．',
                    affine: '線形変換の全結合レイヤーです．',
                    convolution: '畳み込みレイヤーです．スパースコーディングかつ重み共有をします．画像データに対して良く使用されます．',
                    locallyConnectedLayer: 'スパースコーディングのみの畳み込みレイヤーです．MaxPoolingの後に置かれることが多いです．',
                    pooling: '入力領域のプーリングレイヤーです．',
                    maxPooling: '入力領域の最大値をとります．Convolutionの後に置かれることが多いです．',
                    averagePooling: '入力領域の平均を取ります．',
                    sumPooling: '入力領域の和を取ります．',
                    unpooling: 'プーリングの反対でアップサンプリングされます．',
                    upsampling: 'アップサンプリングを行います．',
                    activation: '活性化関数です．',
                    tanh: 'Hyperbolic Tangent です．',
                    sigmoid: 'Sigmoid Function です．',
                    relu: 'Rectified Linear Unit. 区分線形関数の一種です．',
                    crelu: '2つのReLuを原点で結合した関数です．',
                    prelu: 'パラメータ付きのRectified Linear Unitです．',
                    elu: '指数関数のReLuのです．',
                    celu: '2つのELUを原点で結合した関数です．',
                    abs: 'Absolute Function です．',
                    maxout: '区分線形関数で任意の凸関数を近似する関数です．',
                    softmax: 'ソフトマックス関数です．',
                    binary: '重みが+1/-1に2値化され，パラメータ数/計算量が削減されます．',
                    binaryConnectAffine: '重みパラメータが1/-1のAffineレイヤーです．',
                    binaryConnectConvolution: '重みパラメータが1/-1のCovolutionレイヤーです．',
                    binaryWeightAffine: 'BinaryConnectAffineに近似係数が出力ノード数分ついた，BinaryConnectAffineです．',
                    binaryWeightConvolution: 'BinaryConnectConvolutionに近似係数が出力ノード数分ついた，BinaryConnectConvolutionです．',
                    xnorNetAffine: 'インプットを1/-1にした後に，それに近似係数を付けたBinaryWeightAffineです．',
                    xnorNetConvolution: 'インプットを1/-1にした後に，それに近似係数を付けたBinaryWeightConvolutionです．',
                    binaryTanh: '誤差伝播ありのSign関数です．',
                    binarySigmoid: '誤差伝播ありのSign関数です．出力は1/0になります．',
                    math: '四則演算等の基本的な演算です．',
                    product: 'エレメント毎に積を取ります．',
                    sum: 'エレメント毎に和を取ります．',
                    round: 'インプットをラウンドします．',
                    not: '1 - インプットです．',
                    arithmeticScalar: '1つのインプットと1つの内部変数を取る四則演算です．',
                    addScalar: 'インプットに内部変数の値を加えます．',
                    mulScalar: 'インプットと内部変数の値の積を取ります．',
                    subSucalar: 'インプットから内部変数の値を引きます．',
                    rSubSucalar: '内部変数の値からインプットを引きます．',
                    divScalar: 'インプットを内部変数の値で割ります．',
                    rDivScalar: '内部変数の値をインプットで割ります．',
                    powScalar: 'インプットを内部変数の値で累乗します．',
                    rPowScalar: '内部変数の値をインプットで累乗します．',
                    maximumScalar: 'インプットと内部変数の値の最大値を取ります．',
                    minimumScalar: 'インプットと内部変数の値の最小値を取ります．',
                    arithmetic2Inputs: '2つのインプットを取る四則演算です．',
                    add2: '2つのインプットの和です．',
                    sub2: '2つのインプットの内，始めの値を後の値で引きます．',
                    mul2: '2つのインプットの積です．',
                    div2: '2つのインプットの内，始めの値を後の値で割ります．',
                    pow2: '2つのインプットの内，始めの値を後の値で累乗します．',
                    maximum2: '2つのインプットの最大値を取ります．',
                    minimum2: '2つのインプットの最小値を取ります．',
                    others: '他の構成要素',
                    batchNormalization: '特徴量毎にバッチ方向に平均0/分散1の正規化をしてからスケール項を掛けて，バイス項を足します．',
                    dropout: 'ある確率でレイヤーの素子を0にします．アンサンブルモデルの近似で，正則化の一種です．',
                    dropmap: 'バッチ中のサンプル単位でドロップします．バッチ的ドロップアウトです．',
                    embedding: 'Embedをします．文字，単語等の離散値をベクトル化するのに使用します．',
                    localResponseNormalization: '指定された区域で平均0, 分散1の正規化をします．MaxPoolingの後に置かれることが多いです．',
                    reshape: 'テンソルのshapeを変形します．',
                    flatten: 'テンソルの次元をフラットにします．',
                    concate: 'レイヤーを結合します．マルチモーダル入力やフォークしたネットワークの結合に使用します．',
                    transpose: '軸の反転を行います．',
                    slice: '軸毎にスライスします．',
                    reverse: '指定された軸上の値を反転します．',
                },
                layer: {
                    inputDataset: 'sDeep Console CSV Format のheader部分のデータに相当する要素を入力します．通常はxです．',
                    inputSize: 'データの次元です．カラー画像なら，3,height,widthです．',
                    outputInput: 'ラベルに合わせます．10クラスの分類問題の場合なら，10になるように前のレイヤーの出力を調整します．分類問題ならAffine->Softmaxが前のレイヤーに相当します．',
                    outputLossFunction: '通常，分類問題ならCategoricalCrossEntropy，回帰問題ならL2Squaredを選択します．',
                    outputDataset: 'sDeep Console CSV Format のheader部分のラベルに相当する要素を入力します．通常はyです．',
                },
            },
            dataset: {
                trainingButton: '学習用のデータセットです．',
                validationButton: '学習用のデータセットです．',
                uploadData: 'データのアップロードです．Download Utility Toolsを使ってデータを圧縮してから，アップロードしてください．アップロードできるファイルは，合計1GBまでです．',
                downloadUploader: 's3へのアップローダーおよびデータ圧縮のユティリティです．',
            },
            config: {
                data: {
                    batchSize: 'この単位でサンプルがネットワーク入ります．',
                },
                environment: {
                    local: 'sDeep Consoleがホストされているホストで学習を実行するときに選択します．',
                    aws: 'sDeep ConsoleがAWS上にホストされていて，別インスタンスで学習を行いたいときに選択します．',
                    processorType: 'GPUが利用可能な場合はGPUを選択してください．',
                    cpu: 'CPUで学習するときに選択します．',
                    gpu: 'GPUで学習するときに選択します．',
                    multi_gpu: '複数GPUで学習するときに選択します．',
                    single: '通常はこれを選択してください．',
                },
                optimizer: {
                    baseLearningRate: '学習係数の初期値です．',
                    decayParameter: '退化係数です．',
                    learningRateControlMethod: '確率的勾配法の学習係数を決定するアルゴリズムです．',
                    default: '確率的勾配法です．',
                    momentum: '過去の勾配が退化していき現在の勾配の勢いを優先します．',
                    adagrad: '適用的に学習係数が決まります．',
                    adadelta: '適用的に学習係数が決まります．過去の勾配は指数関数的に影響をなくしていきます．一般的にAdagradより良いと言われています．',
                    adam: '適用的に学習係数が決まります．過去の勾配および勾配の勾配は，指数関数的に影響をなくしてきます．良く利用される学習係数の決定手法です．',
                    adamAlpha: 'パラメータ更新のステップサイズです．',
                    adamBeta1: '過去の1次の勾配の影響が指数関数的に減っていく割合です．',
                    adamBeta2: '過去の2次の勾配の影響が指数関数的に減っていく割合です．',
                    learningRateMultiplier: '学習係数に掛かる係数です．',
                    maxEpochs: '学習データセットを読み込む最大回数です．',
                },
                structureSearch: {
                    structureSearchTitle: '構造自動探索です．シードとなるネットワーク構造を与えると，それをベースに最適なネットワーク構造を探索します．',
                    iteratorLimit: '自動探索の上限回数です．上限はX，下限はYです．',
                    method: '構造自動探索の手法です．',
                    random: 'ランダム探索です．',
                    networkFeatureGaussianProcess: 'ガウシアンプロセスによる探索です．',
                },
            },
            result: {
                tradeOffGraph: '学習誤差，バリデーション誤差，および関和回数の関係です．関和回数が小さくて，バリデーション誤差が小さい結果が良い結果となります．',
            },
            common: {
                backButton: '戻る',
                saveButton: '保存',
                saveAsButton: '別名で保存',
                undoButton: 'Undo',
                redoButton: 'Redo',
                cutButton: '切取り',
                copyButton: 'コピー',
                pasteButton: '貼付け',
                runButton: '学習の実行．現在の設定で学習を実行します．',
                profileButton: '設計中のニューラルネットワークの実行速度を詳細に測定します.',
                stopButton: '学習の中止．現在実行中の学習を中断します．',
                evaluateButton: '評価の実行．学習結果で評価します．',
            },
        },
        en: {
            network: {
                component: {
                    io: 'Network I/O.',
                    input: 'Network Input.',
                    output: 'Network Output.',
                    basic: 'Basic layers.',
                    affine: 'Linear transformation, Fully-connected Layer.',
                    convolution: 'Convolution layer. Sparse coding and weight sharing; often used in image processing.',
                    locallyConnectedLayer: 'Convolution with Sparse coding only; often following MaxPooling',
                    pooling: 'Pool layers.',
                    maxPooling: 'Take max values for each regions; often following Convolution.',
                    averagePooling: 'Take average of values for each region.',
                    sumPooling: 'Take sum  of values for each regions.',
                    unpooling: 'The opposite of a pooling, used for upsampling.',
                    upsampling: 'Upsampling.',
                    activation: 'Activation functions.',
                    tanh: 'Hyperbolic Tangent.',
                    sigmoid: 'Sigmoid Function.',
                    relu: 'Rectified Linear Unit; a kind of piecewise linear function.',
                    crelu: 'Concatenated Relu.',
                    prelu: 'Parameterized Rectified Linear Unit.',
                    elu: 'Exponential Linear Unit.',
                    celu: 'Concatenated ELU.',
                    abs: 'Absolute function.',
                    maxout: 'Piecewise linear function approximating any convex functions.',
                    softmax: 'Softmax function.',
                    binary: 'Weights are binarized to reduce parameters and computation.',
                    binaryConnectAffine: 'Affine layer with binary weights.',
                    binaryConnectConvolution: 'Convolution layer with binary weights.',
                    binaryWeightAffine: 'BinaryConnectAffine with approximation factors.',
                    binaryWeightConvolution: 'BinaryConnectConvolution with approximation factors.',
                    xnorNetAffine: 'BinaryConnectConvolution with approximation factors.',
                    xnorNetConvolution: 'BinaryWeightConvolution with input of 1/-1 and approximation factors.',
                    binaryTanh: 'Sign function with backprop implemented.',
                    binarySigmoid: 'Sign function being in {0, 1} with backprop implemented.',
                    math: 'Basic arithmetic operations, e.g., sum and product.',
                    product: 'Take a product element-wisely.',
                    sum: 'Take a summation element-wisely.',
                    round: 'Round the input.',
                    not: 'One minus the input.',
                    arithmeticScalar: 'Arithmetic between one input and one internal value.',
                    addScalar: 'Add the internal value to the input.',
                    mulScalar: 'Multiply the input by the internal value.',
                    subSucalar: 'Subutract the internal value from the input.',
                    rSubSucalar: 'Subtract the input from the internal value.',
                    divScalar: 'Devide the input by the internal value.',
                    rDivScalar: 'Devide the internal vlaue by the input.',
                    powScalar: 'Power the input to the internal value.',
                    rPowScalar: 'Power the internal value to the input.',
                    maximumScalar: 'Maximum the input and the internal value.',
                    minimumScalar: 'Minimum the input and the internal value.',
                    arithmetic2Inputs: 'Arithmetic between two inputs.',
                    add2: 'Addition of two inputs.',
                    sub2: 'Subtract the second input from the first input.',
                    mul2: 'Multiply the two inputs.',
                    div2: 'Devide the first input by the second input.',
                    pow2: 'Power the first input to the second input.',
                    maximum2: 'Maximum the two inputs.',
                    minimum2: 'Minimum the two inputs.',
                    others: 'Others.',
                    batchNormalization: 'Zero-mean/Unit-variance for each feature over batch samples.',
                    dropout: 'Coerce some values of units to 0; considered as an ensemble and regularization method.',
                    dropmap: 'Drop each sample in a batch, or batch-wise dropout.',
                    embedding: 'Embed a discrete value like a character or word to vectorize it.',
                    localResponseNormalization: 'Normalize each regions in zero-mean, unit-variance',
                    reshape: 'Reshape the shape of Tensor.',
                    flatten: 'Flatten dimensions.',
                    concate: 'Concatenate layers used for multimodal inputs or network once forked.',
                    transpose: 'Transpose the axes.',
                    slice: 'Slice the values for each axes.',
                    reverse: 'Reverse the values on the given axis.',
                },
                layer: {
                    inputDataset: 'Input a correspondence of the header of data in sDeep Console CSV Format. Basically, x.',
                    inputSize: 'Tensor dimension. E.g, 3,height,width for color image.',
                    outputInput: 'Use the same value as the num. of classes. E.g., in 10 classes classification problem, use 10 for adjusting output value of the previous layers; You may use Affine to Softmax so that you can adjust output value of Affine layer.',
                    outputLossFunction: 'Normally, select CategoricalCrossEntropy for classification and L2Squared for regression.',
                    outputDataset: 'Input a correspondence of the header of labels in sDeep Console CSV Format. Basically, y.',
                },
            },
            dataset: {
                trainingButton: 'Dataset for training.',
                validationButton: 'Dataset for validation.',
                uploadData: 'Data upload. Use "Download Utility Tools" to compress your data, then upload those. You can upload files up to 1GB.',
                downloadUploader: 'Uploader to s3 and data compressor utility.',
            },
            config: {
                data: {
                    batchSize: 'Unit of samples fed into the network.',
                },
                environment: {
                    local: 'Select when learning task executed in a host where sDeep Console is hosted.',
                    aws: 'Select when sDeep Console is hosted in AWS and executing learning task in another instance.',
                    processorType: 'Select GPU if you can use. When using AWS, select GPU.',
                    cpu: 'Select when to train with CPU.',
                    gpu: 'Select when to train with GPU.',
                    multi_gpu: 'Select when to train with multiple GPUs',
                    single: 'Select usually.',
                },
                optimizer: {
                    baseLearningRate: 'Initial value for learning rate.',
                    decayParameter: 'Decay parameter.',
                    learningRateControlMethod: 'Algorithm to determine learning rate of SGD.',
                    default: 'Stochastic gradient.',
                    momentum: 'Current gradient is considered more preferable than decaying past gradients.',
                    adagrad: 'Adaptive leaning rate.',
                    adadelta: 'Adaptive leaning rate. Exponentially decaying average of the squared gradients. Generally, better than Adagrad.',
                    adam: 'Adaptive leaning rate. Exponentially decaying first-order moment and second-order moment, and often used.',
                    adamAlpha: 'Step size when update parameters.',
                    adamBeta1: 'Rate with which first gradients decrease exponentially.',
                    adamBeta2: 'Rate with which second gradients decrease exponentially.',
                    learningRateMultiplier: 'Rate multiplied to learning rate',
                    maxEpochs: 'Max epochs to iterate whole training dataset',
                },
                structureSearch: {
                    structureSearchTitle: 'Structure Search. Once the seed network is given, it explores an optimizal network based on the seed.',
                    iteratorLimit: 'Number of trials. Upper bound is X, the lower bound is Y.',
                    method: 'Method to be used for Structure Search.',
                    random: 'Random exploration.',
                    networkFeatureGaussianProcess: 'It explores using Gaussian Process with the pre-defined features of a network structure.',
                },
            },
            result: {
                tradeOffGraph: 'Relationship among training errors, validation errors and multiplicative additions. Result of small validation error with small multiplicative additions is better.',
            },
            common: {
                backButton: 'Back',
                saveButton: 'Save',
                saveAsButton: 'Save as',
                undoButton: 'Undo',
                redoButton: 'Redo',
                cutButton: 'Cut',
                copyButton: 'Copy',
                pasteButton: 'Paste',
                runButton: 'Run training with the current configurations',
                profileButton: 'Measure the execution speed of the neural network under design in detail.',
                stopButton: 'Stop current training',
                evaluateButton: 'Run evaluation with a trained network.',
            },
        },
    };

    // DOMにツールチップを設定する
    const tooltip = (() => {
        switch (navigator.language.substring(0, 2)) { // ブラウザーの言語設定
        case 'ja':
            return _projectsEditor.ja;
        default:
            return _projectsEditor.en;
        }
    })();
    // DOM ツリーが構成されてから実行されるよう処理を遅延する
    setTimeout(() => {
        // Networkタブ
        const network = tooltip.network;
        // Component
        const component = network.component;
        $('#IO').attr('title', component.io);
        $('#input').attr('title', component.input);
        $('#output').attr('title', component.output);
        $('#Basic').attr('title', component.basic);
        $('#affine').attr('title', component.affine);
        $('#convolution').attr('title', component.convolution);
        $('#locallyConnectedLayer').attr('title', component.locallyConnectedLayer);
        $('#Pooling').attr('title', component.pooling);
        $('#maxPooling').attr('title', component.maxPooling);
        $('#averagePooling').attr('title', component.averagePooling);
        $('#sumPooling').attr('title', component.sumPooling);
        $('#unpooling').attr('title', component.unpooling);
        $('#upsampling').attr('title', component.upsampling);
        $('#Activation').attr('title', component.activation);
        $('#tanh').attr('title', component.tanh);
        $('#sigmoid').attr('title', component.sigmoid);
        $('#relu').attr('title', component.relu);
        $('#crelu').attr('title', component.crelu);
        $('#prelu').attr('title', component.prelu);
        $('#elu').attr('title', component.elu);
        $('#celu').attr('title', component.celu);
        $('#abs').attr('title', component.abs);
        $('#maxout').attr('title', component.maxout);
        $('#softmax').attr('title', component.softmax);
        $('#Binary').attr('title', component.binary);
        $('#binaryConnectAffine').attr('title', component.binaryConnectAffine);
        $('#binaryConnectConvolution').attr('title', component.binaryConnectConvolution);
        $('#binaryWeightAffine').attr('title', component.binaryWeightAffine);
        $('#binaryWeightConvolution').attr('title', component.binaryWeightConvolution);
        $('#xnorNetAffine').attr('title', component.xnorNetAffine);
        $('#xnorNetConvolution').attr('title', component.xnorNetConvolution);
        $('#binaryTanh').attr('title', component.binaryTanh);
        $('#binarySigmoid').attr('title', component.binarySigmoid);
        $('#Math').attr('title', component.math);
        $('#product').attr('title', component.product);
        $('#sum').attr('title', component.sum);
        $('#round').attr('title', component.round);
        $('#not').attr('title', component.not);
        $('#ArithmeticScalar').attr('title', component.arithmeticScalar);
        $('#addScalar').attr('title', component.addScalar);
        $('#mulScalar').attr('title', component.mulScalar);
        $('#subScalar').attr('title', component.subSucalar);
        $('#rSubScalar').attr('title', component.rSubSucalar);
        $('#divScalar').attr('title', component.divScalar);
        $('#rDivScalar').attr('title', component.rDivScalar);
        $('#powScalar').attr('title', component.powScalar);
        $('#rPowScalar').attr('title', component.rPowScalar);
        $('#maximumScalar').attr('title', component.maximumScalar);
        $('#minimumScalar').attr('title', component.minimumScalar);
        $('#Arithmetic2Inputs').attr('title', component.arithmetic2Inputs);
        $('#add2').attr('title', component.add2);
        $('#sub2').attr('title', component.sub2);
        $('#mul2').attr('title', component.mul2);
        $('#div2').attr('title', component.div2);
        $('#pow2').attr('title', component.pow2);
        $('#maximum2').attr('title', component.maximum2);
        $('#minimum2').attr('title', component.minimum2);
        $('#Others').attr('title', component.others);
        $('#batchNormalization').attr('title', component.batchNormalization);
        $('#dropout').attr('title', component.dropout);
        $('#dropmap').attr('title', component.dropmap);
        $('#embedding').attr('title', component.embedding);
        $('#localResponseNormalization').attr('title', component.localResponseNormalization);
        $('#reshape').attr('title', component.reshape);
        $('#flatten').attr('title', component.flatten);
        $('#concatenate').attr('title', component.concate);
        $('#transpose').attr('title', component.transpose);
        $('#slice').attr('title', component.slice);
        $('#reverse').attr('title', component.reverse);
        // Layer PropertyはSDNParent.jsで付与している
        // Datasetタブ
        const dataset = tooltip.dataset;
        $('#datasetTrainingRadio,#datasetTrainingButton').attr('title', dataset.trainingButton);
        $('#datasetValidationRadio,#datasetValidationButton').attr('title', dataset.trainingButton);
        $('#uploadCsv').attr('title', dataset.uploadData);
        $('#downloadUploader').attr('title', dataset.downloadUploader);
        // Configタブ
        const config = tooltip.config;
        // Data Provider
        $('#configBatchSize').attr('title', config.data.batchSize);
        // Environment
        const environment = config.environment;
        $('#configExecLocal, label[for=configExecLocal]').attr('title', environment.local);
        $('#configExecAws, label[for=configExecAws]').attr('title', environment.aws);
        $('#processorType').attr('title', environment.processorType);
        $('#configCpu, label[for=configCpu]').attr('title', environment.cpu);
        $('#configGpu, label[for=configGpu]').attr('title', environment.gpu);
        $('#configMultiGPU, label[for=configMultiGPU]').attr('title', environment.multi_gpu);
        // JobType
        $('#configSingle, label[for=configSingle]').attr('title', environment.single);
        // Optimizer
        const optimizer = config.optimizer;
        $('#configLearnRate').attr('title', optimizer.baseLearningRate);
        $('#configDecayParam').attr('title', optimizer.decayParameter);
        $('#learningRateControlMethod').attr('title', optimizer.learningRateControlMethod);
        $('#configLearnMethodDefault, label[for=configLearnMethodDefault]').attr('title', optimizer.default);
        $('#configLearnMethodMomentum, label[for=configLearnMethodMomentum]').attr('title', optimizer.momentum);
        $('#configLearnMethodAdagrad, label[for=configLearnMethodAdagrad]').attr('title', optimizer.adagrad);
        $('#configLearnMethodAdadelta, label[for=configLearnMethodAdadelta]').attr('title', optimizer.adadelta);
        $('#configLearnMethodAdam, label[for=configLearnMethodAdam]').attr('title', optimizer.adam);
        $('#configAdamAlpha').attr('title', optimizer.adamAlpha);
        $('#configAdamBeta1').attr('title', optimizer.adamBeta1);
        $('#configAdamBeta2').attr('title', optimizer.adamBeta2);
        $('#configLearnRateMultiplier').attr('title', optimizer.learningRateMultiplier);
        $('#configMaxEpochs').attr('title', optimizer.maxEpochs);
        // Structure Search
        const structureSearch = config.structureSearch;
        $('#structureSearchTitle').attr('title', structureSearch.structureSearchTitle);
        $('#iteratorLimit').attr('title', structureSearch.iteratorLimit);
        $('#method').attr('title', structureSearch.method);
        $('#random').attr('title', structureSearch.random);
        $('#networkFeatureGaussianProcess').attr('title', structureSearch.networkFeatureGaussianProcess);
        // Training ResultタブはSDTResults.jsで付与している
        // その他
        const common = tooltip.common;
        $('#backButton').attr('title', common.backButton);
        $('#save').attr('title', common.saveButton);
        $('#saveAs').attr('title', common.saveAsButton);
        $('#undoButton').attr('title', common.undoButton);
        $('#redoButton').attr('title', common.redoButton);
        $('#cutButton').attr('title', common.cutButton);
        $('#copyButton').attr('title', common.copyButton);
        $('#pasteButton').attr('title', common.pasteButton);
        $('#runButtonImage').attr('title', common.runButton);
        $('#profileButtonImage').attr('title', common.profileButton);
        $('#stopButtonImage').attr('title', common.stopButton);
        $('#evaluateButton').attr('title', common.evaluateButton);
    }, 0);

    return {
        /**
         * ブラウザの設定言語を基にツールチップを取得する
         * @returns {*}
         */
        get: () => tooltip,
    };
};

export default tooltip;
