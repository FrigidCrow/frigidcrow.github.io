import { o as openBlock, c as createElementBlock, g as createStaticVNode, I as useRoute, d as onMounted, e as dispatcherSingleton, f as onUnmounted, O as gsapWithCSS, H as storeToRefs, al as useAppStore, y as watch, T as withDirectives, z as createBlock, a7 as withCtx, A as normalizeClass, u as unref, x as ref, aa as __nuxt_component_0, R as resolveDirective, a as createVNode, am as LogoSvg, U as store } from '#entry';

const _hoisted_1 = {
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 98 29"
};

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<path class=\"logo-type__char\" d=\"M87.4785 8.66144c0-1.33248.4225-2.06372 1.95-2.19372v5.10238h-1.95V8.66144Zm0-5.99616V.195312h1.95V4.84274c-1.5275-.12999-1.95-.86123-1.95-2.17746Zm1.95 3.80244c.1625-.01625.3087-.01625.4875-.01625h4.7774c.1787 0 .325 0 .4875.01625 1.5275.13 1.95.86124 1.95 2.19372v2.90866h-1.95V.195312h1.95V2.66528c0 1.31623-.4225 2.04747-1.95 2.17746-.1625.01625-.3088.01625-.4875.01625H89.916c-.1788 0-.325 0-.4875-.01625v1.62498Z\"></path><path class=\"logo-type__char\" d=\"M77.3486 11.5701V.195312h4.9237c2.665 0 4.1274 1.202478 4.1274 3.444948s-1.4624 3.44495-4.1274 3.44495h-2.9737v4.48489h-1.95Zm1.95-6.01237h2.7787c1.5762 0 2.3725-.55249 2.3725-1.91747s-.7963-1.91747-2.3725-1.91747h-2.7787v3.83494Z\"></path><path class=\"logo-type__char\" d=\"M65.7568 11.5701 69.8843.195312h2.2099L76.2054 11.5701h-1.9987l-1.04-3.05491H68.763l-1.0399 3.05491h-1.9663Zm3.5262-4.58239h3.3637l-1.0237-3.0062c-.2112-.61749-.4387-1.31623-.65-2.01497l-.6662 1.99872-1.0238 3.02245Z\"></path><path class=\"logo-type__char\" d=\"M56.0596 11.5701V.195312h5.2161c2.3075 0 3.7862 1.137488 3.7862 2.941208 0 1.39748-.8125 2.40496-2.1449 2.81121 1.7387.32499 1.8362 1.57622 1.8849 2.51871l.0488.81249c.065.99127.2112 1.67377.5525 2.19367v.0975h-2.08c-.2437-.6174-.3412-1.1212-.4225-2.09617l-.065-.82874c-.13-1.65748-.9262-1.80373-2.0312-1.80373h-2.795v4.72864h-1.9499Zm1.9499-6.32111h2.6813c1.3974 0 2.4212-.34125 2.4212-1.77123 0-1.18623-.78-1.72247-2.21-1.72247h-2.8925v3.4937Z\"></path><path class=\"logo-type__char\" d=\"M48.7021 11.7648c-3.3149 0-5.4599-2.33994-5.4599-5.88239C43.2422 2.27497 45.4522 0 48.9134 0c2.7949 0 4.6474 1.57623 5.0699 4.02994h-1.9662c-.3738-1.73872-1.5925-2.50246-3.2175-2.50246-2.3562 0-3.6074 1.64122-3.6074 4.33868 0 2.81121 1.3649 4.33864 3.7212 4.33864 2.0474 0 3.2987-1.23493 3.2987-3.15241v-.08124h-3.51V5.47617h5.2974v6.09363H52.342v-1.4787c-.7637 1.0887-1.9987 1.6737-3.6399 1.6737Z\"></path><path class=\"logo-type__char\" d=\"M32.2256 8.66144c0-1.33248.4225-2.06372 1.95-2.19372v5.10238h-1.95V8.66144Zm0-5.99616V.195312h1.95V4.84274c-1.5275-.12999-1.95-.86123-1.95-2.17746Zm1.95 3.80244c.1625-.01625.3087-.01625.4874-.01625h4.7775c.1787 0 .325 0 .4875.01625 1.5274.13 1.9499.86124 1.9499 2.19372v2.90866H39.928V.195312h1.9499V2.66528c0 1.31623-.4225 2.04747-1.9499 2.17746-.1625.01625-.3088.01625-.4875.01625H34.663c-.1787 0-.3249 0-.4874-.01625v1.62498Z\"></path><path class=\"logo-type__char\" d=\"M26.3814 11.7648c-3.2662 0-4.8912-1.625-4.8912-3.98117h1.8688c.1462 1.72248 1.2512 2.50247 3.1037 2.50247 1.6574 0 2.5999-.63374 2.5999-1.80373 0-.90998-.5362-1.38123-2.0962-1.72247l-1.6412-.3575c-2.1612-.47124-3.445-1.26748-3.445-3.0712 0-1.90122 1.56-3.3312 4.3712-3.3312 2.6975 0 4.2412 1.28373 4.3387 3.70494h-1.8687c-.1138-1.57622-1.0238-2.24246-2.6-2.24246-1.4625 0-2.3562.63374-2.3562 1.62497 0 .82874.6337 1.25123 1.8362 1.52748l1.8037.40624c2.1775.4875 3.575 1.21874 3.575 3.23371 0 2.09622-1.625 3.50992-4.5987 3.50992Z\"></path><path class=\"logo-type__char\" d=\"M10.9482 11.5701 15.0757.195312h2.2099L21.3968 11.5701h-1.9987l-1.04-3.05491h-4.4037l-1.0399 3.05491h-1.9663Zm3.5262-4.58239h3.3637l-1.0237-3.0062c-.2112-.61749-.4387-1.31623-.65-2.01497l-.6662 1.99872-1.0238 3.02245Z\"></path><path class=\"logo-type__char\" d=\"M.467773 8.66144c0-1.33248.422494-2.06372 1.949967-2.19372v5.10238H.467773V8.66144Zm0-5.99616V.195312H2.41774V4.84274C.890267 4.71275.467773 3.98151.467773 2.66528ZM2.41774 6.46772c.1625-.01625.30875-.01625.4875-.01625h4.77743c.17874 0 .32499 0 .48749.01625 1.52748.13 1.94994.86124 1.94994 2.19372v2.90866H8.17016V.195312h1.94994V2.66528c0 1.31623-.42246 2.04747-1.94994 2.17746-.1625.01625-.30875.01625-.48749.01625H2.90524c-.17875 0-.325 0-.4875-.01625v1.62498Z\"></path><path class=\"logo-type__char\" d=\"M79.2193 28.0226c-3.2662 0-4.8912-1.6249-4.8912-3.9812h1.8687c.1463 1.7225 1.2513 2.5025 3.1037 2.5025 1.6575 0 2.6-.6337 2.6-1.8037 0-.91-.5362-1.3812-2.0962-1.7225l-1.6412-.3575c-2.1613-.4712-3.445-1.2675-3.445-3.0712 0-1.9012 1.56-3.3312 4.3712-3.3312 2.6975 0 4.2412 1.2837 4.3387 3.705h-1.8687c-.1138-1.5763-1.0238-2.2425-2.6-2.2425-1.4625 0-2.3562.6337-2.3562 1.625 0 .8287.6337 1.2512 1.8362 1.5274l1.8037.4063c2.1775.4875 3.575 1.2187 3.575 3.2337 0 2.0962-1.625 3.5099-4.5987 3.5099Z\"></path><path class=\"logo-type__char\" d=\"M65.2676 24.903c0-1.3.4225-2.0312 1.95-2.1612v3.4937h6.2399v1.5925h-8.1899v-2.925Zm0-5.8987v-2.5512h8.0274v1.5763h-6.0774v3.1524c-1.5275-.13-1.95-.8612-1.95-2.1775Zm1.95 3.7375c.1624-.0163.3087-.0163.4874-.0163h5.1675v-1.5274H67.705c-.1787 0-.325 0-.4874-.0163v1.56Z\"></path><path class=\"logo-type__char\" d=\"M54.6777 27.828V16.4531h5.2162c2.3075 0 3.7862 1.1375 3.7862 2.9412 0 1.3975-.8125 2.405-2.145 2.8112 1.7388.325 1.8363 1.5763 1.885 2.5188l.0488.8124c.065.9913.2112 1.6738.5524 2.1938v.0975h-2.0799c-.2438-.6175-.3413-1.1213-.4225-2.0963l-.065-.8287c-.13-1.6575-.9263-1.8037-2.0312-1.8037h-2.795v4.7287h-1.95Zm1.95-6.3212h2.6812c1.3975 0 2.4212-.3412 2.4212-1.7712 0-1.1863-.78-1.7225-2.2099-1.7225h-2.8925v3.4937Z\"></path><path class=\"logo-type__char\" d=\"M47.6354 28.023c-3.2337 0-4.8424-1.6575-4.8424-4.745v-6.8249h1.9499v6.5649c0 2.34.9588 3.4125 2.8925 3.4125s2.8925-1.0725 2.8925-3.4125v-6.5649h1.9499v6.8249c0 3.0875-1.6087 4.745-4.8424 4.745Z\"></path><path class=\"logo-type__char\" d=\"M35.9904 18.6306c0-.2113-.0163-.39-.0488-.585h2.0475c-.0325.195-.0488.3737-.0488.585v9.1974h-1.9499v-9.1974Zm-3.7375-.585h3.6887c-.195-1.3487-1.1537-1.5925-2.0312-1.5925h-1.6575v1.5925Zm5.7362 0h3.6887v-1.5925h-1.6575c-.8775 0-1.8362.2438-2.0312 1.5925Z\"></path><path class=\"logo-type__char\" d=\"M21.1904 27.828V16.4531h2.3562l4.4362 6.8412c.4388.6825.8613 1.3812 1.2838 2.1612-.0488-.9912-.0813-2.015-.0813-3.835v-5.1674h1.8362V27.828h-2.1937l-4.6312-7.0524c-.4062-.6175-.8775-1.3975-1.2349-2.08.0325.9262.065 2.34.065 4.0787v5.0537h-1.8363Z\"></path><path class=\"logo-type__char\" d=\"M11.3164 24.903c0-1.3.4225-2.0312 1.95-2.1612v3.4937h6.2399v1.5925h-8.1899v-2.925Zm0-5.8987v-2.5512h8.0274v1.5763h-6.0774v3.1524c-1.5275-.13-1.95-.8612-1.95-2.1775Zm1.95 3.7375c.1625-.0163.3087-.0163.4875-.0163h5.1674v-1.5274h-5.1674c-.1788 0-.325 0-.4875-.0163v1.56Z\"></path><path class=\"logo-type__char\" d=\"M4.15994 27.828 0 16.4531h2.01497l2.63246 7.5887c.21125.6175.43874 1.3162.64999 2.0149l.66624-1.9987 2.53496-7.6049h1.94998L6.3699 27.828H4.15994Z\"></path>", 17)
  ]))]))
}
const LogoTypeSvg = { render: render };

const CHAR_STAGGER = 0.02;
const VISIBILITY_THRESHOLD_HERO = 0.51;
const VISIBILITY_THRESHOLD_FOOTER = 0.95;

const _sfc_main = {
  __name: "HeaderLogo",
  setup(__props) {

const route = useRoute();

const onLogoClick = (e) => {
  if (route.path === '/') {
    e.preventDefault();
    dispatcherSingleton.trigger({ name: 'scrollToY' }, { y: store.snapPoints[0].value });
  }
};

onMounted(() => {
  initCharDelays();

  dispatcherSingleton.on('scroll', onDispatcherScroll);
});

onUnmounted(() => {
  dispatcherSingleton.off('scroll', onDispatcherScroll);
});

// ? Give logo type chars a random delay
const logoTypeEl = ref(null);
let chars = null;
const initCharDelays = () => {
  chars = [...logoTypeEl.value.$el.querySelectorAll('.logo-type__char')];
  chars = gsapWithCSS.utils.shuffle(chars);

  gsapWithCSS.set(chars, {
    transitionDelay: gsapWithCSS.utils.distribute({
      amount: (chars.length - 1) * CHAR_STAGGER,
      ease: 'none'
    })
  });
};

// ? Handle logo visibility once loader is done
const isVisible = ref(false);
const { isLoaderVisible } = storeToRefs(useAppStore());
watch(
  () => isLoaderVisible.value,
  (newVal) => {
    if (!newVal) {
      isVisible.value = true;
    }
  }
);

// ? Handle logo type visibility
const isTypeHidden = ref(false);
const onDispatcherScroll = ({ currentY, total }) => {
  if (isLoaderVisible.value) return

  const progress = currentY / total;

  isTypeHidden.value =
    progress >= VISIBILITY_THRESHOLD_HERO &&
    progress <= VISIBILITY_THRESHOLD_FOOTER;
};

return (_ctx, _cache) => {
  const _component_NuxtLink = __nuxt_component_0;
  const _directive_sound = resolveDirective("sound");

  return withDirectives((openBlock(), createBlock(_component_NuxtLink, {
    to: "/",
    "aria-label": "Hyperlink to home page",
    class: normalizeClass([{ 'header-logo--visible': unref(isVisible) }, "header-logo"]),
    onClick: onLogoClick
  }, {
    default: withCtx(() => [
      createVNode(unref(LogoSvg), {
        class: "header-logo__mark",
        "aria-hidden": "true"
      }),
      createVNode(unref(LogoTypeSvg), {
        ref_key: "logoTypeEl",
        ref: logoTypeEl,
        class: normalizeClass(["header-logo__type", { 'header-logo__type--hidden': unref(isTypeHidden) }]),
        "aria-hidden": "true"
      }, null, 8, ["class"])
    ]),
    _: 1
  }, 8, ["class"])), [
    [_directive_sound, { click: 'click', hover: 'hover' }]
  ])
}
}

};

export { _sfc_main as default };
