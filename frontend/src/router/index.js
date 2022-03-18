import { createWebHistory, createRouter } from "vue-router"
import Swal from "sweetalert2"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { guess: true },
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    meta: { guess: true },
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { login: true },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/findbeds",
    name: "Findbeds",
    component: () => import("../views/Findbeds.vue"),
  },
  {
    path: "/beds",
    name: "Beds",
    meta: { login: true },
    component: () => import("../views/Beds.vue"),
  },
  {
    path: "/addbedsforsell",
    name: "Addbedsforsell",
    meta: { login: true },
    component: () => import("../views/Addbedsforsell.vue"),
  },
  {
    path: "/bedsmanage",
    name: "Bedsmanage",
    meta: { login: true },
    component: () => import("../views/Bedsmanage.vue"),
  },
  {
    path: "/bededit/:id",
    name: "Bededit",
    meta: { login: true },
    component: () => import("../views/Bededit.vue"),
  },
  {
    path: "/bededitaddress/:id",
    name: "Bededitaddress",
    meta: { login: true },
    component: () => import("../views/Bededitaddress.vue"),
  },
  {
    path: "/one",
    name: "One",
    meta: { login: true },
    component: () => import("../views/One.vue"),
  },
  {
    path: "/two",
    name: "Two",
    meta: { login: true },
    component: () => import("../views/Two.vue"),
  },
  {
    path: "/three",
    name: "Three",
    meta: { login: true },
    component: () => import("../views/Three.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token")

  if (to.meta.login && !isLoggedIn) {
    Swal.fire({
      title: "โปรดลงชื่อเข้าสู่ระบบ",
      icon: "warning",
      showConfirmButton: true,
    })
    next({ path: "/signin" })
    return
  }
  if (to.meta.guess && isLoggedIn) {
    next({ path: "/" })
    return
  }
  next()
})

export default router
