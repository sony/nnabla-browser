<template>
    <ul v-if="open" class="context-menu" tabindex="-1" v-bind:style="{ top: top, left: left }" >
        <li v-for="(item, index) in menuItems" :key=index class="context-menu-item">
            <menu-action    v-if="item.type=='action'" :text=item.text :action=item.action :disabled=item.disabled></menu-action>
            <menu-separator v-if="item.type=='separator'"></menu-separator>
            <menu-submenu   v-if="item.type=='submenu'" :text=item.text :action=item.action :submenu=item.submenu></menu-submenu>
        </li>
    </ul>
</template>

<script>
import Definitions from './../../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';
// action
const menuAction = {
    template: `
        <span v-if="!disabled" v-on:click.prevent.stop="_action" class="item-text">{{ text }}</span>
        <span v-else class="item-text disabled">{{ text }}</span>`,
    props: ['text', 'action', 'disabled'],
    methods: {
        _action: function(e) {
            if (typeof this.action == 'function') {
                this.action(e);
            }
            this.$parent.$emit('close_menu', '');
        },
    },
};
// separator
const menuSeparator = {
    template: `<span class="item-separator"></span>`,
};
// submenu
Vue.component('menu-submenu', {
    template: `
        <span v-if="active" v-on:click.prevent.stop="submenu_show"
            @mouseenter="submenu_show"
            @mouseleave="submenu_hide"
            class="item-text item-submenu">{{ text }}
            <context-menu ref="submenu" :menuItems="submenu">
            </context-menu>
        </span>
        <span v-else class="item-text disabled">{{ text }}</span>`,
    props: ['text', 'action', 'submenu'],
    computed: {
        active: function() {
            return this.submenu.some(function(val) {
                return (val.type == 'action' && !val.disabled);
            });
        },
    },
    methods: {
        submenu_show: function(e) {
            e.preventDefault();
            this.$refs.submenu.$emit('open_submenu', {'parent': this});
            this.open = true;
        },
        submenu_hide: function(e) {
            this.open = false;
            this.$refs.submenu.$emit('close_menu', '');
        },
    },
});
export default {
    props: ['menuItems'],
    data: function() {
        return {
            open: false,
            top: 0,
            left: 0,
        };
    },
    components: {
        'menu-action': menuAction,
        'menu-separator': menuSeparator,
    },
    created: function() {
        this.$on('open', this.open_menu);
        this.$on('open_submenu', this.open_submenu);
        this.$on('close_menu', this.close_menu);
    },
    methods: {
        open_menu: function(params) {
            this.open = true;
            Vue.nextTick(function() {
                const parentDom = params.parent.$el;
                let x;
                let y;
                if (!params.point) {
                    y = params.event.pageY - $(parentDom).offset().top;
                    x = params.event.pageX - $(parentDom).offset().left;
                    if (window.innerHeight < (y + this.$el.offsetHeight)) {
                        y = window.innerHeight - this.$el.offsetHeight - 48;
                    }
                    if (window.innerWidth < (x + this.$el.offsetWidth)) {
                        x = window.innerWidth - this.$el.offsetWidth - 48;
                    }
                } else {
                    y = params.point.y - $(parentDom).offset().top;
                    x = params.point.x;
                    if (window.innerHeight < (y + this.$el.offsetHeight)) {
                        y -= this.$el.offsetHeight + 24;
                    }
                    if (window.innerWidth < (x + this.$el.offsetWidth)) {
                        x -= this.$el.offsetWidth + 24;
                    }
                }
                this.top = y + 'px';
                this.left = x + 'px';
            }.bind(this));
            this.clickListenStart();
        },
        open_submenu: function(params) {
            this.open = true;
            Vue.nextTick(function() {
                const parentDom = params.parent.$el;
                const x = $(parentDom).outerWidth();
                this.top = '0px';
                this.left = x + 'px';
            }.bind(this));
            this.clickListenStart();
        },
        close_menu: function() {
            this.open = false;
            this.clickListenStop();
        },
        clickListenStart: function() {
            window.addEventListener('click', this.onclick, true);
            window.addEventListener('contextmenu', this.onclick, true);
            window.addEventListener('keyup', this.onescape, true);
        },
        onclick: function(e) {
            if (this.open && !this.$el.contains(e.target)) {
                this.open = false;
                this.clickListenStop();
            }
        },
        onescape: function(e) {
            if (e.keyCode === Definitions.KEY_CODE.ESC) this.onclick(e);
        },
        clickListenStop: function() {
            window.removeEventListener('click', this.onclick, true);
            window.removeEventListener('contextmenu', this.onclick, true);
            window.removeEventListener('keyup', this.onescape, true);
        },
    },
};
</script>

<style>
.context-menu {
  position: absolute;
  min-width: 200px;
  padding: 8px 16px;
  font-size: 13px;
  background-color: white;
  border: lightgray 1px solid;
  color: black;
  border-radius: 0px;
  z-index: 999999;
}

.context-menu > .context-menu-item {
  position: relative;
  display: block;
  margin-bottom: 1px;
  background-color: #fff;
  border: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  white-space: nowrap;
}

.context-menu-item:hover {
  background-color: var(--color-gray1);
}

.context-menu a {
  text-decoration: none;
  color: black;
}

.menu-item.enabled:hover {
  background-color: var(--color-gray1);
  margin-right: -15px;
  margin-left: -15px;
  padding: 0px 15px;
}

.disabled {
  color: darkgray;
}

.item-text {
  padding: 0px 20px;
  display: block;
}

.item-separator {
  padding: 0px;
  margin-top: 3px;
  margin-bottom: 3px;
  width: 100%;
  border-top: solid 1px lightgray;
  display: block;
}

.item-submenu:after{
  content: ' ';
  width: 0;
  height: 0;
  position: absolute;
  border: solid 4px transparent;
  border-left-color:#000;
  border-left-width: 7px;
  top: 30%;
  left: 95%;
}

.action-menu-item {
  top: auto;
  left: auto;
  right: -70px !important;
  padding: 0px;
  border-color: var(--color-gray0);
}
</style>
