<template>
    <div class="app-row" style="top: 0; bottom: 0;">
        <component-palette class="app-row" style="top: 0; bottom: 310px; border-bottom: 1px solid var(--color-gray2);"
                           :selected-component="selectedComponent"
                           @selected-component="name => $emit('selected-component', name)"
                           @history="command => $emit('history', command)"
        />
        <property-area class="app-row" style="height: 310px; bottom: 0;"
                       :selection="selection"
                       @renamed="onrenamed"
                       @history="command => $emit('history', command)"
        />
    </div>
</template>

<script>
    import Graph from './../../currentGraph';
    import Layer from './../../editor/SDNLayer';
    import Definitions from './../../misc/Definitions';

    const componentPalette = {
        props: {selectedComponent: String},
        template: `
    <div>
        <div class="title">Layer Component</div>
        <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px 0 16px;">
            <component-category
                v-for="category in categories"
                :key="category.name"
                :category="category"
                :selected-component="selectedComponent"
                @update:selected="onUpdateSelected"
                />
        </div>
    </div>`,
        data: () => {
            return {categories: nNablaCore.layers.categories};
        },
        components: {
            'component-category': {
                props: ['category', 'selectedComponent'],
                template: `
        <div class="category">
            <div class="nnc-invoker title" @click="expand = !expand;"
                ><img class="icon-small" :src="'./editor/image/Arrow' + (expand ? 'Down' : '') + '.svg'"></img
                >{{ category.name }}</div>
            <div class="components" :style="{display: expand ? 'block' : 'none'}">
                <component-layer
                    v-for="name in category.components"
                    :name="name"
                    :key="name"
                    :class="selectedComponent === name ? 'active' : ''"
                    @update:selected="$emit('update:selected', name)"
                    />
            </div>
        </div>
        `,
                data: () => {
                    return {expand: true};
                },
                components: {
                    'component-layer': {
                        props: ['name'],
                        template: `
                <div class="nnc-invoker component"
                    tabIndex="1000"
                    :id="_headLower(name)"
                    draggable="true"
                    @click.prevent="_setFocus"
                    @dblclick.prevent="_addLayer"
                    @keyup.enter.prevent="_addLayer"
                    >{{ name }}</div>`,
                        methods: {
                            _headLower: (name) => name.substring(0, 1).toLowerCase() + name.substring(1),
                            _emitSelected: function () {
                                this.$emit('update:selected', this.name);
                            },
                            _setFocus: function (event) {
                                event.target.focus();
                                this._emitSelected();
                            },
                            _addLayer: function (event) {
                                if (window.uop()) {
                                    event.target.focus();
                                    this._emitSelected();
                                    window.svgArea.addLayer(this.name);
                                }
                            },
                        },
                    }
                },
            }
        },
        methods: {
            onUpdateSelected(name) {
                this.$emit('selected-component', name);
            },
        },
        mounted: function () {
            // configure drag event handler for component palette item.
            let _dragContext;

            const selectedComponent = () => this.selectedComponent;
            const emitChangeSelectedComponent = (name) => this.onUpdateSelected(name);

            const _commandPush = (command) => this.$emit('history', {type: 'push', argument: command});
            const callbackAddLayer = function (cursor) {
                let svgArea = window.svgArea;
                // 二回目以降の SVG 領域への Enter イベントで、再追加しないようコールバックを外す
                svgArea.unsubscribeMouseEnter(callbackAddLayer);

                let type = selectedComponent();

                // 既存選択の解除
                Graph.selection.clear();

                let offseted = {
                    x: cursor.x - Definitions.EDIT.LAYER.RECT_WIDTH / 2,
                    y: cursor.y - Definitions.EDIT.LAYER.RECT_HEIGHT / 2,
                };
                _dragContext = (() => {
                    // レイヤー追加
                    let option = {type: type, x: offseted.x, y: offseted.y};
                    let layerAddedMouseEnter = new Layer(option, svgArea);
                    Graph.selection.layer.focus(layerAddedMouseEnter);
                    layerAddedMouseEnter.autoLink();

                    // 移動予測位置追加
                    svgArea.showGrid();
                    let frame = svgArea.createLayerDestinationFrame(offseted);
                    return {
                        move: (cursor) => {
                            let position = {
                                x: cursor.x - Definitions.EDIT.LAYER.RECT_WIDTH / 2,
                                y: cursor.y - Definitions.EDIT.LAYER.RECT_HEIGHT / 2,
                            };
                            layerAddedMouseEnter.setPosition(position);
                            frame.move(svgArea.calcLayerDropPosition(layerAddedMouseEnter));
                            svgArea.trackCursorMovement(cursor);
                        },
                        destroy: () => {
                            svgArea.hideGrid();
                            let dropPosition = svgArea.calcLayerDropPosition(layerAddedMouseEnter);
                            layerAddedMouseEnter.setPosition(dropPosition);
                            let autoLinked = layerAddedMouseEnter.autoLink();
                            frame.destroy();
                            svgArea.requestAdjustSize();

                            let serialized = layerAddedMouseEnter.serialize();
                            _commandPush({
                                exec: () => {
                                    let layer = Layer.deserialize(serialized);
                                    Graph.selection.clear();
                                    Graph.selection.layer.focus(layer);
                                    autoLinked.redo();
                                    svgArea.requestAdjustSize();
                                },
                                undo: () => {
                                    autoLinked.undo();
                                    Layer.findObjectBySerialized(serialized).remove();
                                    svgArea.requestAdjustSize();
                                },
                                name: () => 'Add layer : ' + type,
                            });
                        },
                    };
                })();
            };

            d3.selectAll('.component').call(
                d3.drag()
                    .on('start', function () {
                        let type = $(this).text();
                        $(this)[0].focus();
                        emitChangeSelectedComponent(type);

                        // create null context
                        _dragContext = {
                            move: (cursor) => undefined,
                            destroy: () => undefined,
                        };

                        // マウスカーソルが編集領域に入ったときにはじめて、レイヤーを追加する
                        window.svgArea.subscribeMouseEnter(callbackAddLayer);
                    })
                    .on('drag', function () {
                        // レイヤーの移動
                        let mouse = d3.mouse(d3.select(Definitions.EDIT.SVG_ID).node());
                        _dragContext.move({x: mouse[0], y: mouse[1]});
                    })
                    .on('end', function () {
                        _dragContext.destroy();
                        _dragContext = undefined;

                        window.svgArea.unsubscribeMouseEnter(callbackAddLayer);
                    })
            );
        },
    };
    const propertyArea = {
        props: ['selection'],
        template: `
    <div class="property-area">
        <div class="title">Layer Property</div>
        <layer-type :layer="layer" />
        <selected-layers :selection="selection" />
        <layer-properties class="app-row app-scroll-x app-scroll-y" style="top: 88px; bottom: 0;"
            :layer="layer"
            @renamed="onrenamed"
            @history="command => $emit('history', command)"
        />
    </div>`,
        components: {
            'layer-type': {
                props: ['layer'],
                template: `
            <div class="layer" :style="style">
            <div class="drop-cap" :style="{'background-color': color}">{{ type.substring(0, 1) }}</div>
            <div class="name">{{ type }}</div>
            <a title="Refer documentation" :href="'https://support.dl.sony.com/391/#' + type" target="_blank" />
            </div>
            `,
                computed: {
                    style: function () {
                        return this.layer ? {} : {visibility: 'hidden'};
                    },
                    color: function () {
                        return this.layer ? this.layer.color : 'transparent';
                    },
                    type: function () {
                        return this.layer ? this.layer.type : '';
                    },
                },
            },
            'selected-layers': {
                props: ['selection'],
                template: `<div style="height: 24px; padding-left: 48px;">
            <span v-if="selection.main"><span v-if="number">and {{ number }} more {{ text(number) }}</span></span>
            <span v-else-if="total">{{ total }} {{ text(total) }}</span>
            </div>`,
                computed: {
                    number: function () {
                        return Math.max(0, this.selection.all.length - 1);
                    },
                    total: function () {
                        return (this.selection.all || []).length;
                    },
                },
                methods: {
                    text: (number) => 'layer' + (number === 1 ? ' is' : 's are') + ' selected.',
                },
            },
            'layer-properties': {
                props: ['layer'],
                template: `<div>
                <div class="property" v-for="property in ((layer || {}).props || [])">
                    <div class="content">
                        <div class="name">{{ property.name }}</div>
                        <component
                        :is="'prop-' + property.type"
                        :property="property"
                        :class="'value' + (property.error ? ' warning' : '')"
                        :title="property.error"
                        @update="onupdate"
                        @renaming="onrenaming"
                        @renamed="onrenamed"
                        />
                    </div>
                </div>
            </div>`,
                components: {
                    'prop-immutable': {
                        props: ['property'],
                        template: '<div style="color: var(--color-brand);">{{ property.computed }}</div>',
                    },
                    'prop-name': {
                        props: ['property'],
                        template: `<input type="text" :value="property.value"
                    @focus="onfocus"
                    @blur="onblur"
                    @keyup.enter="defocus"
                    @keyup.esc="defocus"
                    @keypress="onkeypress"
                    />`,
                        methods: {
                            onfocus: function (event) {
                                event.target.select();
                            },
                            onblur: function (event) {
                                this.$emit('renamed', event.target.value);
                            },
                            onkeypress: function (event) {
                                switch (event.key) {
                                    case '!':
                                    case '@':
                                    case '#':
                                    case '$':
                                    case '%':
                                    case '^':
                                    case '&':
                                    case '*':
                                    case '(':
                                    case ')':
                                    case '-':
                                    case '+':
                                    case '=':
                                    case '|':
                                    case '\\':
                                    case '~':
                                    case '`':
                                    case '{':
                                    case '}':
                                    case '[':
                                    case ']':
                                    case ':':
                                    case ';':
                                    case '"':
                                    case ',':
                                    case '.':
                                    case '<':
                                    case '>':
                                    case '/':
                                    case '?':
                                        event.preventDefault();
                                        break;
                                }
                                if (event.key === '#') {
                                    document.execCommand('insertText', false, '_'); // to enable editing undo/redo by Ctrl+Z
                                }
                                // delay event emission; for event.target.value does not updated during keypress event.
                                let self = this;
                                setTimeout(function () {
                                    self.$emit('renaming', event.target.value);
                                });
                            },
                            defocus: function (event) {
                                event.target.blur();
                            },
                        },
                    },
                    'prop-text': {
                        props: ['property'],
                        template: `<div>
                    <input type="text" :value="property.computed"
                    @focus="onfocus"
                    @blur="onblur"
                    @keyup.enter="defocus"
                    @keyup.esc="defocus"
                    /></div>`,
                        methods: {
                            onfocus: function (event) {
                                event.target.value = this.property.value; // switch user's raw input value
                                event.target.select();
                            },
                            onblur: function (event) {
                                this.$emit('update', {name: this.property.name, value: event.target.value});
                                event.target.value = this.property.computed; // this value will be overwritten by calculation.
                            },
                            defocus: function (event) {
                                event.target.blur();
                            },
                        },
                    },
                    'prop-bool': {
                        props: ['property'],
                        template: `<div @click.self="onclick">
                    <label><input type="checkbox" ref="check" :checked="checked" @change="onchange" /><span /></label>
                    </div>`,
                        computed: {
                            checked: function () {
                                return String(this.property.value || false).toLowerCase() === 'true';
                            }
                        },
                        methods: {
                            onclick: function () {
                                this.$refs.check.click();
                            },
                            onchange: function (event) {
                                this.$emit('update', {name: this.property.name, value: Boolean(event.target.checked)});
                            },
                        },
                    },
                    'prop-select': {
                        props: ['property'],
                        template: `<select :value="property.value" @change="onchange">
                    <option v-for="value in property.choice" :checked="value === property.value">{{ value }}</option>
                    </select>`,
                        methods: {
                            onchange: function (event) {
                                this.$emit('update', {name: this.property.name, value: event.target.value});
                            },
                        },
                    },
                },
                data: function () {
                    return {};
                },
                methods: {
                    onupdate: function (property) {
                        let changes = Graph.selection.layer.apply((layer) => {
                            let old = layer.getUserInputProperty(property.name);
                            return property.value === old ? null : {layer: layer.name(), from: old, to: property.value};
                        }).filter((x) => x);
                        let _changeTo = (dir) => {
                            let layers = Graph.layers();
                            changes.forEach((change) => {
                                let layer = layers.find((layer) => layer.name() === change.layer);
                                if (layer) layer.setUserInputProperty(property.name, change[dir]);
                            });
                        };
                        if (changes.length) {
                            let historyName = 'Edit property : ' + this.layer.type + ' -> ' + property.name;
                            this.$emit('history', {
                                type: 'push-and-execute',
                                argument: {
                                    name: () => historyName,
                                    exec: () => _changeTo('to'),
                                    undo: () => _changeTo('from'),
                                },
                            });
                        }
                    },
                    onrenaming: function (value) {
                        let rename = this.rename;
                        if (!rename) {
                            let layers = Graph.selection.layer.members();
                            let focused = Graph.selection.layer.focused();
                            let items;
                            if (focused) {
                                items = [focused].concat(layers.filter((layer) => layer !== focused));
                            } else {
                                items = layers;
                            }
                            rename = {
                                component: this.layer.type,
                                items: items.map((item) => {
                                    return {layer: item, name: item.name()};
                                }),
                            };
                        }

                        rename.items.forEach((item) => item.layer.setUserInputProperty('Name', value));
                        this.rename = rename; // NOTE that rename object should not be reactive!
                    },
                    onrenamed: function (value) {
                        let rename = this.rename;
                        delete this.rename;
                        let changes = rename.items.map((item) => {
                            return {from: item.name, to: item.layer.name()};
                        })
                            .filter((item) => item.from !== item.to);
                        let _inverted = (changes) => changes.map((change) => {
                            return {from: change.to, to: change.from};
                        });
                        let _exec = (changes) => {
                            let layers = Graph.layers();
                            changes.forEach((item) => {
                                layers.find((layer) => layer.name() === item.from).name(item.to);
                                this.$emit('renamed', changes);
                            });
                        };
                        if (changes.length) {
                            let historyName = 'Edit property : ' + rename.component + ' -> Name';
                            this.$emit('history', {
                                type: 'push',
                                argument: {
                                    name: () => historyName,
                                    exec: () => _exec(changes),
                                    undo: () => _exec(_inverted(changes)),
                                },
                            });
                        }
                        this.$emit('renamed', changes);
                    },
                },
            },
        },
        computed: {
            layer: function () {
                return this.selection.props;
            },
        },
        methods: {
            onrenamed: function (changes) { // bubbling up rename event
                this.$emit('renamed', changes);
            },
        },
    };
    export default {
        props: ['selection', 'selectedComponent'],
        components: {
            'component-palette': componentPalette,
            'property-area': propertyArea,
        },
        methods: {
            onrenamed: function (changes) { // bubbling up rename event
                this.$emit('renamed', changes);
            },
        },
    };
</script>

<style>
    .icon-small {
        width: 16px;
        height: 16px;
    }

    .category .icon-small {
        padding-top: 0;
        margin-right: 8px;
        vertical-align: middle;
    }

    .category .title {
        padding-top: 3px;
        height: 24px;
        margin-top: 0;
        margin-left: 0;
    }

    .category .component {
        padding-top: 3px;
        height: 24px;
        margin-left: 0;
        padding-left: 40px;
    }

    .property-area .title {
        margin-top: 0;
        padding-top: 12px;
    }

    .property-area .layer {
        font-family: "SSTUI-Medium";
        margin-top: 8px;
        font-size: 16px;
        width: 100%;
        height: 24px;
    }

    .property-area .layer > .drop-cap {
        position: absolute;
        left: 16px;

        font-family: "SSTUI-Medium";
        color: var(--color-gray0);
        letter-spacing: 0;
        text-align: center;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background-color: var(--color-brand);
    }

    .property-area .layer > .name {
        position: absolute;
        left: 48px;
        right: 40px;
        line-height: 24px;

        overflow-x: hidden;
    }

    .property-area .layer > a {
        position: absolute;
        right: 16px;
        width: 24px;
        height: 24px;
        display: inline-block;

        background-image: url('../../../../editor/image/Dictionary.svg');
        background-position: right;
        background-repeat: no-repeat;
        background-size: 24px 24px;
        filter: brightness(0);
    }

    .property-area .property {
        padding: 0;
        margin: 0;
        padding-left: 16px;
        padding-right: 16px;
    }

    .property-area .property .content {
        height: 25px;
        border-bottom: solid 1px var(--color-gray2);
        padding-top: 3px;
    }

    .property-area .property .name {
        float: left;
        overflow: hidden;
        color: var(--color-gray4);
        width: 50%;
        padding-right: 4px;
    }

    .property-area .property .value {
        float: left;
        overflow: hidden;
        color: var(--color-gray5);
        width: 50%;
        padding-left: 4px;
    }

    .property input[type="text"] {
        width: 100%;
    }

    .property input[type="text"]:not(:focus) {
        border-color: transparent;
        outline-color: transparent;
        background-color: transparent;
    }

    /* cover 'hidden' input and span */
    .property label {
        cursor: pointer;
        position: relative;
        height: 16px;
    }

    .property label > input[type="checkbox"] {
        display: none;
    }

    /* slider background which having round corner */
    .property label > input[type="checkbox"] + span {
        display: inline-block;
        vertical-align: text-bottom;
        width: 32px;
        height: 13px;
        border-radius: 13px;
        background-color: var(--color-gray4);
    }

    /* background color changed to layer1's when checked */
    .property label > input[type="checkbox"]:checked + span {
        background-color: var(--color-brand);
    }

    /* draw round thumb on sllider */
    .property label > input[type="checkbox"] + span::after {
        display: inline-block;
        content: "";
        margin: 1px;
        width: 11px;
        height: 11px;
        border-radius: 11px;
        background-color: var(--color-gray1);
        transition: margin .125s;
    }

    /* thumb moved to left when checked */
    .property label > input[type="checkbox"]:checked + span::after {
        margin-left: 20px;
    }

    .property select {
        width: 100%;
    }

    .property select:not(:active) {
        border-color: transparent;
        outline-color: transparent;
        background-color: transparent;
    }

    /* warning icon in property panel */
    .property .content .value.warning::after {
        width: 16px;
        height: 16px;
        display: inline-block;
        content: '';
        position: absolute;
        right: 16px;

        background-image: url('../../../image/Warning.svg');
        background-size: 16px 16px;
    }
</style>
