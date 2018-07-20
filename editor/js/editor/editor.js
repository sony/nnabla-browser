/**
 * Editor タブ全体の統御
 */
export default (function() {
    let _stockedLayer;
    let _touchingConnector;

    return {
        stockLayer: (layer) => _stockedLayer = layer,
        stockedLayer: () => _stockedLayer,
        touchConnector: (connector) => _touchingConnector = connector,
        touchingConnector: () => _touchingConnector,
    };
})();
