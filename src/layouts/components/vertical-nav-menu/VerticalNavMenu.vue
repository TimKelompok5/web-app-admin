<script>
// eslint-disable-next-line object-curly-newline
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'
import { menu } from "@/utils/menu.js"
import { defineComponent } from 'vue'
import { usePrivilege } from "@/composables/usePrivilege"

export default defineComponent({
  components: {
    NavMenuSectionTitle,
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {


    return {
      menu: menu,
      ...usePrivilege()
    }
  },
})
</script>
<template>
  <v-navigation-drawer :value="isDrawerOpen" app floating width="260" class="app-navigation-menu" :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)">
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img :src="require('@/assets/images/logos/logo_cexup.webp')" max-height="30px" max-width="30px" alt="logo" contain
          eager class="app-logo me-3" />
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            CEXUP
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list expand nav class="vertical-nav-menu-items pr-5">
      <template v-for="(item, index) in menu">
        <nav-menu-link v-if="item.type == 'link'" :key="item.link" :title="item.name" :to="item.link" :icon="item.icon"
          v-show="hasAccess(item.visible)" />

        <nav-menu-group v-else-if="item.type == 'sub'" :key="item.link + 'group'" :title="item.name" :icon="item.icon">
          <nav-menu-link v-for="(item2, idx) in item.child" :key="idx" :title="item2.name" :to="item2.link"
            v-show="hasAccess(item2.visible)" />
        </nav-menu-group>
        <nav-menu-section-title v-else-if="item.type == 'divider'" :title="item.name" />
      </template>

    </v-list>
    <a href="#" target="_blank" rel="nofollow">
      <v-img :src="require(`@/assets/images/pro/upgrade-banner-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
        alt="upgrade-banner" transition="scale-transition" class="upgrade-banner mx-auto" max-width="230"></v-img>
    </a>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;

  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
