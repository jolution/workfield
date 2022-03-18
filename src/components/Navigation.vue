<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <nav :class="[$store.state.rights == 1 ? 'bg-red-800' : 'bg-gray-800']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
              <!--Hallo {{ $store.state.username }}, {{ $store.state.rights }}-->
            </div>
            <div class="hidden md:block">
              <ul class="ml-10 flex items-baseline space-x-4">
                <li v-for="item in mainNav" :key="item.name">
                  <NavItem v-if="(item.meta.requiresAdmin == true && $store.state.rights == 1) || item.meta.requiresAdmin == false" :href="item.href" :is-active="currentRoutePath == item.href ? true : false">
                    {{ item.name }}
                  </NavItem>
                </li>
                <li>
                  <NavItem v-if="$store.state.username == undefined" href="/login"><i18n-t keypath="login" /></NavItem>
                </li>
                <li>
                  <NavItem v-if="$store.state.username" href="/login/:logout"><i18n-t keypath="logout" /></NavItem>
                </li>
              </ul>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div id="mobile-menu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">workfield</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>

          <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reports</a>
        </div>
      </div>
    </nav>

    <main class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
    
  </div>
</template>

<script>
import NavItem from './NavItem.vue'

// Source: https://tailwindui.com/components/marketing/elements/headers
// import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
/*import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'*/

const mainNav = [
  {
    name: 'Start',
    href: '/',
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    name: 'Benutzer hinzufügen',
    href: '/add-user',
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    //icon: CursorClickIcon,
  },
  {
    name: 'Arbeit eintragen',
    href: '/add-work',
    //icon: ViewGridIcon,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    name: 'Arbeit anzeigen',
    href: '/list-work',
    //icon: RefreshIcon,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
    {
    name: 'Benutzer ausgeben',
    href: '/list-users',
    //icon: RefreshIcon,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
]

export default {
  components: {
    NavItem,
  },
  setup() {
    return {
      mainNav,
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    },
    currentRoutePath() {
        return this.$route.path;
    }
  },
}

</script>