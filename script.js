/* ==========================================================================
   MARÉ TWIN — Full Interactive Storefront Logic
   ========================================================================== */

(() => {
  const FREE_SHIPPING_THRESHOLD = 450;

  const COUPONS = {
    MARETWIN10: {
      code: "MARETWIN10",
      type: "percent",
      value: 10,
      label: "10% OFF",
    },
    PRIMEIRACOMPRA: {
      code: "PRIMEIRACOMPRA",
      type: "percent",
      value: 15,
      label: "15% OFF",
    },
    FRETEGRATIS: {
      code: "FRETEGRATIS",
      type: "shipping",
      value: 0,
      label: "Frete Grátis",
    },
  };

  const PRODUCTS = [
    {
      id: "mt-01",
      name: "Vestido Midi Brisa em Linho",
      collection: "Brisa de Linho",
      category: "Vestidos",
      session: "vestidos",
      price: 489.0,
      oldPrice: 549.0,
      tag: "Mais Vendido",
      featured: true,
      popularity: 99,
      createdAt: 202604,
      sizes: ["PP", "P", "M", "G", "GG"],
      image: "assets/prod-vestido-linho.jpg",
      desc: "Modelagem fluida em linho puro tom areia-marfim com fivela escultórica banhada a ouro envelhecido na cintura.",
      material: "100% Linho Europeu certificado · Forro em algodão leve",
      care: "Lavar à mão com sabão neutro. Secar à sombra.",
    },
    {
      id: "mt-02",
      name: "Conjunto Twin Areia & Linho",
      collection: "Essenciais da Costa",
      category: "Conjuntos Twin",
      session: "vestidos",
      price: 598.0,
      oldPrice: null,
      tag: "Assinatura Twin",
      featured: true,
      popularity: 96,
      createdAt: 202605,
      sizes: ["PP", "P", "M", "G"],
      image: "assets/prod-conjunto-twin.jpg",
      desc: "Dupla coordenada de camisa cropped com gola resort e calça pantalona de cintura alta em linho aveia.",
      material: "85% Linho, 15% Viscose EcoVero · Botões naturais",
      care: "Lavar em ciclo delicado. Passar com vapor.",
    },
    {
      id: "mt-03",
      name: "Kaftan Solar Bordado Ouro",
      collection: "Solar Dourado",
      category: "Kaftans & Praia",
      session: "praia",
      price: 379.0,
      oldPrice: 420.0,
      tag: "Novo",
      featured: true,
      popularity: 93,
      createdAt: 202607,
      sizes: ["P", "M", "G", "Único"],
      image: "assets/prod-kaftan-solar.jpg",
      desc: "Saída de praia etérea em gaze de algodão listrada areia e creme com bordado artesanal bronze no decote.",
      material: "100% Gaze de Algodão Egípcio · Bordado em fio metálico suave",
      care: "Lavar separadamente em água fria. Não torcer.",
    },
    {
      id: "mt-04",
      name: "Camisa Costa Linho Puro",
      collection: "Brisa de Linho",
      category: "Camisas & Linho",
      session: "linho",
      price: 329.0,
      oldPrice: null,
      tag: "Unissex",
      featured: true,
      popularity: 91,
      createdAt: 202606,
      sizes: ["P", "M", "G", "GG"],
      image: "assets/prod-camisa-costa.jpg",
      desc: "Camisa resort de caimento relaxado com gola camp e botões de madrepérola natural, ideal para dias de sol.",
      material: "100% Linho Natural pré-lavado (toque macio)",
      care: "Lavar à máquina em modo suave. Secar no cabide.",
    },
    {
      id: "mt-05",
      name: "Calça Pantalona Dunas",
      collection: "Brisa de Linho",
      category: "Camisas & Linho",
      session: "linho",
      price: 389.0,
      oldPrice: null,
      tag: "Essencial",
      featured: false,
      popularity: 88,
      createdAt: 202603,
      sizes: ["PP", "P", "M", "G", "GG"],
      image: "assets/prod-calca-dunas.jpg",
      desc: "Alfaiataria costeira de perna ampla com pregas sutis e bolsos laterais em tom areia dourada.",
      material: "100% Linho estruturado 210g/m²",
      care: "Lavar a frio. Passar do avesso.",
    },
    {
      id: "mt-06",
      name: "Maiô Concha Bronze & Pareô",
      collection: "Solar Dourado",
      category: "Kaftans & Praia",
      session: "praia",
      price: 349.0,
      oldPrice: 399.0,
      tag: "Edição Limitada",
      featured: false,
      popularity: 95,
      createdAt: 202608,
      sizes: ["PP", "P", "M", "G"],
      image: "assets/prod-maio-concha.jpg",
      desc: "Maiô escultórico em tom bronze-ouro com detalhe central de concha metálica anticorrosiva e pareô creme.",
      material: "Poliamida biodegradável UV50+ com leve brilho acetinado",
      care: "Enxaguar em água doce após mar ou piscina.",
    },
    {
      id: "mt-07",
      name: "Kit Tote Palha & Brincos Concha",
      collection: "Essenciais da Costa",
      category: "Acessórios",
      session: "acessorios",
      price: 289.0,
      oldPrice: null,
      tag: "Artesanal",
      featured: false,
      popularity: 90,
      createdAt: 202605,
      sizes: ["Único"],
      image: "assets/prod-acessorios-mare.jpg",
      desc: "Bolsa tote trançada à mão em palha natural com alças em couro caramelo acompanhada de brincos concha ouro velho.",
      material: "Palha natural de carnaúba, couro vegetal e banho ouro 18k",
      care: "Limpar com pano seco e guardar em saco de algodão.",
    },
    {
      id: "mt-08",
      name: "Vestido Longo Pôr do Sol",
      collection: "Noite Dourada",
      category: "Vestidos",
      session: "vestidos",
      price: 549.0,
      oldPrice: 610.0,
      tag: "Cápsula 001",
      featured: false,
      popularity: 94,
      createdAt: 202609,
      sizes: ["PP", "P", "M", "G"],
      image: "assets/hero-editorial.jpg",
      desc: "Peça protagonista da campanha Costa Dourada com movimento amplo e decote elegante para jantares à beira-mar.",
      material: "70% Linho, 30% Seda rústica natural",
      care: "Lavagem delicada à mão ou a seco.",
    },
  ];

  const SESSIONS = [
    {
      id: "praia",
      eyebrow: "Sessão 01 · Sol & Sal",
      title: "Praia & Sol",
      short:
        "Kaftans etéreos, maiôs escultóricos e pareôs em tons bronze e areia.",
      bannerDesc:
        "Peças pensadas para a beira-mar com proteção UV50+, metais resistentes à maresia e tecidos de secagem rápida.",
      image: "assets/prod-maio-concha.jpg",
    },
    {
      id: "linho",
      eyebrow: "Sessão 02 · Fibras Puras",
      title: "Alfaiataria em Linho",
      short: "Camisas resort e pantalonas frescas com caimento impecável.",
      bannerDesc:
        "Nosso linho pré-lavado entrega conforto térmico incomparável e elegância descomplicada do café da manhã ao entardecer.",
      image: "assets/prod-camisa-costa.jpg",
    },
    {
      id: "vestidos",
      eyebrow: "Sessão 03 · Dualidade",
      title: "Vestidos & Conjuntos",
      short: "Silhuetas fluidas e conjuntos Twin coordenados.",
      bannerDesc:
        "Looks completos em um instante: vestidos atemporais e conjuntos Twin que multiplicam as possibilidades na sua mala.",
      image: "assets/prod-vestido-linho.jpg",
    },
    {
      id: "acessorios",
      eyebrow: "Sessão 04 · Detalhes",
      title: "Acessórios Costeiros",
      short: "Palha trançada à mão, chapéus e metais em ouro envelhecido.",
      bannerDesc:
        "O toque final da estética MARÉ TWIN: peças artesanais com acabamento natural que elevam qualquer produção solar.",
      image: "assets/prod-acessorios-mare.jpg",
    },
  ];

  const FAQS = [
    {
      q: "Como funciona o frete grátis na MARÉ TWIN?",
      a: "Pedidos a partir de R$ 450,00 ganham Frete Grátis automaticamente para todo o Brasil! Você também pode usar o cupom FRETEGRATIS ou escolher Retirada Gratuita em nosso atelier.",
    },
    {
      q: "Como escolher o tamanho ideal nas peças de linho?",
      a: "Nossa modelagem é fluida (resort fit). Use a Calculadora de Tamanho na aba Sessões ou consulte a Tabela Oficial de Medidas aqui no Suporte. Entre dois tamanhos, prefira o maior se gostar de caimento mais solto.",
    },
    {
      q: "Quais são as formas de pagamento aceitas?",
      a: "Aceitamos Pix com 5% de desconto extra imediato, Cartão de Crédito em até 6x sem juros e Boleto Bancário.",
    },
    {
      q: "Como faço para trocar ou devolver uma peça?",
      a: 'A primeira troca é gratuita em até 30 dias corridos após o recebimento (e devoluções em até 7 dias). Basta selecionar "Solicitar Troca ou Devolução" no formulário ao lado com o número do seu pedido.',
    },
    {
      q: "Como cuidar das peças em linho 100% natural?",
      a: "Lave em água fria com sabão neutro, evite secadora e seque sempre à sombra. Para desamassar com leveza, prefira vaporizador ou ferro morno pelo avesso.",
    },
    {
      q: "Os metais dos maiôs e vestidos oxidam no mar?",
      a: "Não! Utilizamos metais com banho especial anticorrosivo pensados para o ambiente costeiro. Ainda assim, recomendamos enxaguar a peça em água doce após o banho de mar ou piscina.",
    },
  ];

  const POLICIES = {
    privacy: {
      title: "Política de Privacidade",
      body: `<p>A <strong>MARÉ TWIN</strong> respeita integralmente a sua privacidade e a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
             <p>Os dados informados durante a navegação, simulações de frete, carrinho e atendimento ficam armazenados localmente no seu navegador nesta versão interativa da loja e são utilizados exclusivamente para melhorar sua experiência de compra.</p>
             <p>Nunca comercializamos informações pessoais com terceiros.</p>`,
    },
    terms: {
      title: "Termos de Uso",
      body: `<p>Ao navegar e realizar pedidos na loja <strong>MARÉ TWIN</strong>, você concorda com nossas condições de atendimento, prazos de entrega e política de cupons.</p>
             <p>Os cupons promocionais (<code>MARETWIN10</code>, <code>PRIMEIRACOMPRA</code>, <code>FRETEGRATIS</code>) não são cumulativos entre si, mas somam-se ao benefício de 5% OFF para pagamentos via Pix.</p>`,
    },
    returns: {
      title: "Política de Trocas e Devoluções",
      body: `<p>Queremos que você ame cada peça da MARÉ TWIN. Caso precise trocar tamanho ou modelo, oferecemos <strong>primeira troca gratuita em até 30 dias corridos</strong> após a entrega.</p>
             <p>Para devolução por arrependimento, o prazo é de 7 dias corridos com estorno integral na mesma forma de pagamento.</p>
             <p>As peças devem estar sem sinais de uso, com etiqueta original fixada. Solicite diretamente pelo formulário na aba <strong>Suporte</strong>.</p>`,
    },
  };

  // ---------- Persistent State ----------
  const loadLS = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveLS = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota errors */
    }
  };

  const DEFAULT_ORDERS = [
    {
      code: "MT-2026-1042",
      date: "19/11/2026",
      customer: "Cliente Maré Twin",
      statusStep: 3, // 1=Confirmado, 2=Separação, 3=Em Trânsito, 4=Entregue
      eta: "24/11/2026",
      payment: "Pix (5% OFF)",
      shippingLabel: "SEDEX Expresso",
      total: 464.55,
      items: [
        {
          id: "mt-01",
          name: "Vestido Midi Brisa em Linho",
          size: "M",
          qty: 1,
          price: 489.0,
        },
      ],
    },
  ];

  const state = {
    view: "home",
    cart: loadLS("maretwin_cart", []),
    favs: loadLS("maretwin_favs", []),
    orders: loadLS("maretwin_orders", DEFAULT_ORDERS),
    tickets: loadLS("maretwin_tickets", []),
    coupon: loadLS("maretwin_coupon", null),
    shipping: loadLS("maretwin_shipping", {
      cep: "",
      method: "pac",
      cost: 0,
      calculated: false,
      options: [],
    }),
    selectedSizes: {},
    activeCollection: "Todas",
    onlyFavs: false,
    activeSession: "praia",
    lookSize: "M",
  };

  // ---------- Helpers ----------
  const brl = (val) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  let toastTimer;
  function showToast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
  }

  function updateBadges() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    $("#countDesktop").textContent = totalQty;
    $("#countMobile").textContent = totalQty;
    $("#countNav").textContent = totalQty;
    $("#favCountBadge").textContent = state.favs.length;
  }

  // ---------- Navigation ----------
  function navigate(viewName) {
    if (!$(`#view-${viewName}`)) viewName = "home";
    state.view = viewName;
    $$(".view").forEach((v) =>
      v.classList.toggle("active", v.id === `view-${viewName}`),
    );
    $$("[data-nav]").forEach((btn) => {
      if (
        btn.tagName === "BUTTON" &&
        (btn.closest(".nav") || btn.closest(".mobile-nav"))
      ) {
        btn.classList.toggle("active", btn.dataset.nav === viewName);
      }
    });

    if (viewName === "collections") renderCollection();
    if (viewName === "sessions") renderSessionsView();
    if (viewName === "cart") renderCart();
    if (viewName === "support") renderSupport();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Product Card Template ----------
  function productCardHTML(p) {
    const isFav = state.favs.includes(p.id);
    const selectedSize =
      state.selectedSizes[p.id] ||
      p.sizes[Math.min(1, p.sizes.length - 1)] ||
      p.sizes[0];
    return `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-image" data-open-product="${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
          <button type="button" class="favorite-btn ${isFav ? "saved" : ""}" data-toggle-fav="${p.id}" aria-label="Favoritar ${p.name}">
            ${isFav ? "♥" : "♡"}
          </button>
          <button type="button" class="quick-view-pill" data-open-product="${p.id}">Ver detalhes</button>
        </div>
        <div class="product-info">
          <div class="product-meta">${p.collection} · ${p.category}</div>
          <div class="product-title-row">
            <div class="product-title" data-open-product="${p.id}">${p.name}</div>
            <div class="price-block">
              ${p.oldPrice ? `<span class="price-old">${brl(p.oldPrice)}</span>` : ""}
              <span class="price">${brl(p.price)}</span>
            </div>
          </div>
          <p class="product-desc">${p.desc}</p>
          <div class="size-row">
            ${p.sizes
              .map(
                (s) => `
              <button type="button" class="size-btn ${selectedSize === s ? "selected" : ""}" data-select-size="${p.id}:${s}">${s}</button>
            `,
              )
              .join("")}
          </div>
          <button type="button" class="add-btn" data-add-cart="${p.id}">Adicionar ao Carrinho</button>
        </div>
      </article>
    `;
  }

  // ---------- Cart & Favorites Mutations ----------
  function addToCart(productId, sizeOverride, qty = 1, silent = false) {
    const p = getProduct(productId);
    if (!p) return;
    const size =
      sizeOverride ||
      state.selectedSizes[productId] ||
      p.sizes[Math.min(1, p.sizes.length - 1)] ||
      p.sizes[0];
    const existing = state.cart.find(
      (item) => item.id === productId && item.size === size,
    );
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ id: productId, size, qty });
    }
    saveLS("maretwin_cart", state.cart);
    updateBadges();
    if (!silent) showToast(`✓ ${p.name} (${size}) adicionado ao carrinho!`);
  }

  function toggleFavorite(productId) {
    const idx = state.favs.indexOf(productId);
    const p = getProduct(productId);
    if (idx >= 0) {
      state.favs.splice(idx, 1);
      showToast(`Removido dos favoritos: ${p ? p.name : ""}`);
    } else {
      state.favs.push(productId);
      showToast(`♥ Salvo nos favoritos: ${p ? p.name : ""}`);
    }
    saveLS("maretwin_favs", state.favs);
    updateBadges();
    rerenderCurrentGrids();
  }

  function rerenderCurrentGrids() {
    renderHome();
    if (state.view === "collections") renderCollection();
    if (state.view === "sessions") renderSessionsView();
    if ($("#favsModal").classList.contains("show")) renderFavsModal();
  }

  // ---------- VIEW 1: HOME ----------
  function renderHome() {
    const featured = PRODUCTS.filter((p) => p.featured);
    $("#featuredGrid").innerHTML = featured.map(productCardHTML).join("");

    $("#homeSessionsGrid").innerHTML = SESSIONS.map((s) => {
      const count = PRODUCTS.filter((p) => p.session === s.id).length;
      return `
        <button type="button" class="session-card" data-jump-session="${s.id}">
          <div class="session-card-img">
            <img src="${s.image}" alt="${s.title}" loading="lazy">
          </div>
          <div class="session-card-body">
            <small>${count} ${count === 1 ? "peça" : "peças"}</small>
            <h3>${s.title}</h3>
            <p>${s.short}</p>
          </div>
        </button>
      `;
    }).join("");
  }

  // ---------- VIEW 2: COLEÇÕES ----------
  function renderCollectionPills() {
    const collections = [
      "Todas",
      ...new Set(PRODUCTS.map((p) => p.collection)),
    ];
    $("#collectionPills").innerHTML = collections
      .map(
        (col) => `
      <button type="button" class="pill-btn ${state.activeCollection === col ? "active" : ""}" data-collection-pill="${col}">${col}</button>
    `,
      )
      .join("");
  }

  function renderCollection() {
    renderCollectionPills();
    const q = ($("#searchInput").value || "").trim().toLowerCase();
    const cat = $("#categoryFilter").value;
    const sz = $("#sizeFilter").value;
    const sort = $("#sortFilter").value;

    let list = PRODUCTS.filter((p) => {
      if (
        state.activeCollection !== "Todas" &&
        p.collection !== state.activeCollection
      )
        return false;
      if (cat !== "Todos" && p.category !== cat) return false;
      if (sz !== "Todos" && !p.sizes.includes(sz)) return false;
      if (state.onlyFavs && !state.favs.includes(p.id)) return false;
      if (q) {
        const hay =
          `${p.name} ${p.desc} ${p.collection} ${p.category} ${p.material}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else if (sort === "new") list.sort((a, b) => b.createdAt - a.createdAt);
    else if (sort === "popular")
      list.sort((a, b) => b.popularity - a.popularity);
    else list.sort((a, b) => Number(b.featured) - Number(a.featured));

    $("#resultsCounter").textContent =
      `Exibindo ${list.length} de ${PRODUCTS.length} peças`;
    const activeLabels = [];
    if (state.activeCollection !== "Todas")
      activeLabels.push(`Coleção: ${state.activeCollection}`);
    if (cat !== "Todos") activeLabels.push(`Categoria: ${cat}`);
    if (sz !== "Todos") activeLabels.push(`Tamanho: ${sz}`);
    if (state.onlyFavs) activeLabels.push("Apenas Favoritos");
    $("#activeFilterLabel").textContent = activeLabels.join(" · ");

    const favToggle = $("#onlyFavsToggle");
    favToggle.classList.toggle("active", state.onlyFavs);
    favToggle.style.background = state.onlyFavs ? "var(--gold)" : "";
    favToggle.style.color = state.onlyFavs ? "var(--paper)" : "";
    favToggle.textContent = state.onlyFavs
      ? "♥ Favoritos (ativo)"
      : "♡ Favoritos";

    if (list.length === 0) {
      $("#collectionGrid").innerHTML = "";
      $("#noResults").style.display = "block";
    } else {
      $("#noResults").style.display = "none";
      $("#collectionGrid").innerHTML = list.map(productCardHTML).join("");
    }
  }

  function resetCollectionFilters() {
    state.activeCollection = "Todas";
    state.onlyFavs = false;
    $("#searchInput").value = "";
    $("#categoryFilter").value = "Todos";
    $("#sizeFilter").value = "Todos";
    $("#sortFilter").value = "featured";
    renderCollection();
  }

  // ---------- VIEW 3: SESSÕES ----------
  const LOOK_IDS = ["mt-04", "mt-05", "mt-07"];

  function renderSessionsView() {
    $("#sessionsSelectorGrid").innerHTML = SESSIONS.map((s) => {
      const items = PRODUCTS.filter((p) => p.session === s.id);
      const minPrice = Math.min(...items.map((i) => i.price));
      return `
        <button type="button" class="session-card ${state.activeSession === s.id ? "active" : ""}" data-select-session="${s.id}">
          <div class="session-card-img">
            <img src="${s.image}" alt="${s.title}">
          </div>
          <div class="session-card-body">
            <small>${items.length} ${items.length === 1 ? "peça" : "peças"} · a partir de ${brl(minPrice)}</small>
            <h3>${s.title}</h3>
            <p>${s.short}</p>
          </div>
        </button>
      `;
    }).join("");

    const active =
      SESSIONS.find((s) => s.id === state.activeSession) || SESSIONS[0];
    const items = PRODUCTS.filter((p) => p.session === active.id);

    $("#activeSessionBanner").innerHTML = `
      <div>
        <div class="eyebrow">${active.eyebrow}</div>
        <h3>${active.title}</h3>
        <p>${active.bannerDesc}</p>
      </div>
      <div style="text-align:right">
        <span style="font-size:12px; color:var(--muted); display:block; margin-bottom:6px;">${items.length} ${items.length === 1 ? "peça" : "peças"} nesta sessão</span>
        <button type="button" class="btn sm soft" data-nav="collections">Ver catálogo completo</button>
      </div>
    `;

    $("#sessionProductsGrid").innerHTML = items.map(productCardHTML).join("");

    // Render Look Builder
    const lookProducts = LOOK_IDS.map(getProduct).filter(Boolean);
    const rawTotal = lookProducts.reduce((s, p) => s + p.price, 0);
    const discounted = rawTotal * 0.9;
    $("#lookBuilderList").innerHTML = lookProducts
      .map(
        (p) => `
      <div class="look-item">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <strong>${p.name}</strong>
          <span>${p.category} · ${p.sizes.includes("Único") ? "Tam. Único" : `Tam. ${state.lookSize}`}</span>
        </div>
        <strong>${brl(p.price)}</strong>
      </div>
    `,
      )
      .join("");
    $("#lookOldPrice").textContent = brl(rawTotal);
    $("#lookFinalPrice").textContent = brl(discounted);
  }

  // ---------- VIEW 4: CARRINHO ----------
  function computeCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => {
      const p = getProduct(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);

    let discount = 0;
    if (state.coupon && state.coupon.type === "percent") {
      discount = subtotal * (state.coupon.value / 100);
    }

    const freeShipUnlocked =
      subtotal >= FREE_SHIPPING_THRESHOLD ||
      (state.coupon && state.coupon.type === "shipping");

    let shippingCost = 0;
    if (state.shipping.calculated) {
      if (state.shipping.method === "pickup") shippingCost = 0;
      else if (freeShipUnlocked && state.shipping.method === "pac")
        shippingCost = 0;
      else if (state.coupon && state.coupon.type === "shipping")
        shippingCost = 0;
      else shippingCost = state.shipping.cost;
    }

    const total = Math.max(0, subtotal - discount + shippingCost);
    return { subtotal, discount, shippingCost, freeShipUnlocked, total };
  }

  function renderCart() {
    const container = $("#cartContent");
    const clearBtn = $("#clearCartBtn");

    if (state.cart.length === 0) {
      clearBtn.style.display = "none";
      container.innerHTML = `
        <div class="empty-state">
          <h3>Seu carrinho está vazio</h3>
          <p>Explore nossas peças em linho natural, kaftans e acessórios costeiros para começar sua seleção.</p>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <button class="btn" data-nav="collections">Explorar Coleções</button>
            <button class="btn secondary" data-nav="sessions">Ver Sessões</button>
          </div>
        </div>
      `;
      return;
    }

    clearBtn.style.display = "inline-flex";
    const { subtotal, discount, shippingCost, freeShipUnlocked, total } =
      computeCartTotals();
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    const shipOptionsHTML = state.shipping.calculated
      ? `
        <div class="shipping-options">
          ${state.shipping.options
            .map((opt) => {
              const effectiveCost =
                opt.id === "pickup" ||
                (freeShipUnlocked && opt.id === "pac") ||
                (state.coupon && state.coupon.type === "shipping")
                  ? 0
                  : opt.price;
              return `
              <div class="shipping-opt ${state.shipping.method === opt.id ? "selected" : ""}" data-choose-ship="${opt.id}:${opt.price}">
                <label>
                  <input type="radio" name="shipMethod" ${state.shipping.method === opt.id ? "checked" : ""}>
                  <span><strong>${opt.name}</strong> · ${opt.days}</span>
                </label>
                <strong>${effectiveCost === 0 ? "Grátis" : brl(effectiveCost)}</strong>
              </div>
            `;
            })
            .join("")}
        </div>
      `
      : "";

    container.innerHTML = `
      <div class="free-ship-bar">
        <div class="free-ship-text">
          <span>${
            freeShipUnlocked
              ? "✦ Parabéns! Você desbloqueou <strong>Frete Grátis</strong> no envio padrão."
              : `Faltam <strong>${brl(remaining)}</strong> para ganhar <strong>Frete Grátis</strong>!`
          }</span>
          <span>${Math.round(pct)}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>

      <div class="cart-layout">
        <div class="cart-list">
          ${state.cart
            .map((item, idx) => {
              const p = getProduct(item.id);
              if (!p) return "";
              return `
              <div class="cart-item">
                <img src="${p.image}" alt="${p.name}" style="cursor:pointer" data-open-product="${p.id}">
                <div>
                  <h3>${p.name}</h3>
                  <div class="cart-item-meta">
                    <span>${p.collection}</span>
                    <span>·</span>
                    <label>Tam:
                      <select class="cart-size-select" data-change-cart-size="${idx}">
                        ${p.sizes.map((s) => `<option value="${s}" ${s === item.size ? "selected" : ""}>${s}</option>`).join("")}
                      </select>
                    </label>
                  </div>
                  <div class="qty-control">
                    <button type="button" data-cart-qty="${idx}:-1" aria-label="Diminuir quantidade">−</button>
                    <span>${item.qty}</span>
                    <button type="button" data-cart-qty="${idx}:1" aria-label="Aumentar quantidade">+</button>
                  </div>
                  <div><button type="button" class="remove-btn" data-cart-remove="${idx}">Remover item</button></div>
                </div>
                <div class="cart-item-price" style="text-align:right">
                  <div style="font-size:12px; color:var(--muted)">${brl(p.price)} / un.</div>
                  <strong style="font-size:16px;">${brl(p.price * item.qty)}</strong>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>

        <aside class="summary-card">
          <h3>Resumo do Pedido</h3>

          <div style="margin-bottom:14px;">
            <label style="font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-soft);">Calcular Frete (CEP)</label>
            <form id="cepForm" class="inline-form">
              <input id="cepInput" maxlength="9" placeholder="00000-000" value="${state.shipping.cep || ""}">
              <button class="btn soft sm" type="submit">Calcular</button>
            </form>
            ${shipOptionsHTML}
          </div>

          <div style="margin-bottom:16px;">
            <label style="font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink-soft);">Cupom Promocional</label>
            <form id="couponForm" class="inline-form">
              <input id="couponInput" placeholder="Ex: MARETWIN10" style="text-transform:uppercase">
              <button class="btn soft sm" type="submit">Aplicar</button>
            </form>
            ${
              state.coupon
                ? `
              <div class="coupon-tag">
                <span>✓ ${state.coupon.code} (${state.coupon.label})</span>
                <button type="button" id="removeCouponBtn" aria-label="Remover cupom">✕</button>
              </div>
            `
                : `<span style="font-size:11px; color:var(--muted)">Experimente: MARETWIN10, PRIMEIRACOMPRA ou FRETEGRATIS</span>`
            }
          </div>

          <div class="summary-line"><span>Subtotal</span><span>${brl(subtotal)}</span></div>
          ${discount > 0 ? `<div class="summary-line" style="color:var(--success)"><span>Desconto (${state.coupon.code})</span><span>− ${brl(discount)}</span></div>` : ""}
          <div class="summary-line">
            <span>Frete</span>
            <span>${!state.shipping.calculated ? "Calcular CEP" : shippingCost === 0 ? "Grátis" : brl(shippingCost)}</span>
          </div>
          <div class="summary-line summary-total">
            <span>Total</span>
            <span>${brl(total)}</span>
          </div>
          <p style="font-size:12px; color:var(--muted); margin:6px 0 18px;">
            Ou <strong>${brl(total * 0.95)}</strong> no Pix (5% OFF) · até 6x de ${brl(total / 6)} sem juros
          </p>

          <button type="button" class="btn" id="openCheckoutBtn" style="width:100%">Finalizar Compra</button>
          <button type="button" class="btn soft" data-nav="collections" style="width:100%; margin-top:8px;">Continuar Comprando</button>
        </aside>
      </div>
    `;
  }

  // ---------- CHECKOUT MODAL ----------
  let checkoutPaymentMethod = "pix";

  function animateCheckoutCard() {
    const scene = $("#checkoutCardScene");
    const card = $("#checkoutCard");
    if (!scene || !card) return;

    const gsap = window.gsap;
    const isFlipped = card.classList.contains("is-flipped");

    if (gsap) {
      card.classList.add("checkout-card-gsap");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(card, {
          opacity: 1,
          rotationY: isFlipped ? 180 : 0,
          scale: 1,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        card,
        { opacity: 0, rotationY: isFlipped ? 164 : -16, scale: 0.93, y: 28 },
        {
          opacity: 1,
          rotationY: isFlipped ? 180 : 0,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
        },
      );
      gsap.fromTo(
        scene.querySelectorAll(".checkout-card-front > *"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.24 },
      );
    }

    scene.addEventListener("pointermove", (event) => {
      if (
        !gsap ||
        event.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      gsap.to(scene, {
        rotationX: (0.5 - y) * 12,
        rotationY: (x - 0.5) * 16,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    scene.addEventListener("pointerleave", () => {
      if (!gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      gsap.to(scene, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.65,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    });
  }

  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    checkoutPaymentMethod = "pix";
    renderCheckoutForm();
    openModal("checkoutModal");
  }

  function renderCheckoutForm() {
    const { subtotal, discount, shippingCost, total } = computeCartTotals();
    const pixTotal = total * 0.95;
    const finalTotal = checkoutPaymentMethod === "pix" ? pixTotal : total;

    $("#checkoutModalContent").innerHTML = `
      <div class="eyebrow">Checkout Seguro MARÉ TWIN</div>
      <h2 style="font-family:var(--font-serif); font-size:32px; margin:6px 0 18px;">Finalizar Pedido</h2>

      <form id="checkoutForm">
        <h4 style="margin:0 0 10px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold-deep);">1. Dados de Entrega</h4>
        <div class="form-grid">
          <div class="form-group">
            <label for="coName">Nome Completo</label>
            <input id="coName" required placeholder="Seu nome completo">
          </div>
          <div class="form-group">
            <label for="coEmail">E-mail</label>
            <input id="coEmail" type="email" required placeholder="voce@email.com">
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="coCep">CEP</label>
            <input id="coCep" required maxlength="9" placeholder="00000-000" value="${state.shipping.cep || ""}">
          </div>
          <div class="form-group">
            <label for="coCity">Cidade / UF</label>
            <input id="coCity" required placeholder="Ex: Florianópolis - SC">
          </div>
        </div>
        <div class="form-group">
          <label for="coAddress">Endereço Completo</label>
          <input id="coAddress" required placeholder="Rua, número, complemento e bairro">
        </div>

        <h4 style="margin:18px 0 6px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold-deep);">2. Forma de Pagamento</h4>
        <div class="pay-tabs">
          <button type="button" class="pay-tab ${checkoutPaymentMethod === "pix" ? "active" : ""}" data-pay-tab="pix">Pix (5% OFF)</button>
          <button type="button" class="pay-tab ${checkoutPaymentMethod === "card" ? "active" : ""}" data-pay-tab="card">Cartão (6x s/ juros)</button>
          <button type="button" class="pay-tab ${checkoutPaymentMethod === "boleto" ? "active" : ""}" data-pay-tab="boleto">Boleto</button>
        </div>

        <div id="paymentExtraFields">
          ${
            checkoutPaymentMethod === "pix"
              ? `
            <div class="pix-box">
              <strong>Desconto Pix aplicado!</strong> Você economiza ${brl(total - pixTotal)}.<br>
              Código Pix Copia e Cola será gerado imediatamente após confirmar o pedido.
            </div>
          `
              : checkoutPaymentMethod === "card"
                ? `
            <section class="checkout-card-section" aria-label="Dados do cartão">
              <div class="checkout-card-scene" id="checkoutCardScene">
                <div class="checkout-card" id="checkoutCard">
                  <div class="checkout-card-face checkout-card-front">
                    <div class="checkout-card-top">
                      <span class="checkout-card-chip" aria-hidden="true"></span>
                      <span class="checkout-card-brand">MARÉ TWIN</span>
                    </div>
                    <div class="checkout-card-number" id="previewCardNumber">•••• •••• •••• ••••</div>
                    <div class="checkout-card-bottom">
                      <div>
                        <span class="checkout-card-label">TITULAR</span>
                        <span class="checkout-card-value" id="previewCardName">SEU NOME</span>
                      </div>
                      <div>
                        <span class="checkout-card-label">VALIDADE</span>
                        <span class="checkout-card-value" id="previewCardExpiry">MM/AA</span>
                      </div>
                    </div>
                  </div>
                  <div class="checkout-card-face checkout-card-back">
                    <div class="checkout-card-stripe"></div>
                    <div class="checkout-card-cvv">
                      <span>CVV</span>
                      <span class="checkout-card-cvv-value" id="previewCardCvv">•••</span>
                    </div>
                    <span class="checkout-card-brand checkout-card-brand-back">MARÉ TWIN</span>
                  </div>
                </div>
              </div>
              <p class="checkout-card-notice">Demonstração de checkout: não informe dados reais. As informações do cartão não são salvas.</p>
              <div class="form-group">
                <label for="coCardName">Nome impresso no cartão</label>
                <input id="coCardName" autocomplete="off" maxlength="26" placeholder="Como aparece no cartão" required>
              </div>
              <div class="form-group">
                <label for="coCard">Número do Cartão</label>
                <input id="coCard" inputmode="numeric" autocomplete="off" placeholder="0000 0000 0000 0000" maxlength="23" required>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label for="coCardExpiry">Validade</label>
                  <input id="coCardExpiry" inputmode="numeric" autocomplete="off" placeholder="MM/AA" maxlength="5" pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Digite a validade no formato MM/AA" required>
                </div>
                <div class="form-group">
                  <label for="coCardCvv">CVV</label>
                  <input id="coCardCvv" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4" pattern="[0-9]{3,4}" title="Digite o código de segurança com 3 ou 4 números" required>
                </div>
              </div>
            </section>
            <div class="form-grid">
              <div class="form-group">
                <label for="coInstallments">Parcelamento</label>
                <select id="coInstallments">
                  ${[1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}">${n}x de ${brl(total / n)} sem juros</option>`).join("")}
                </select>
              </div>
            </div>
          `
                : `
            <div class="pix-box">O boleto bancário terá vencimento em 2 dias úteis e será exibido na confirmação.</div>
          `
          }
        </div>

        <div style="background:var(--linen); border:1px solid var(--line); border-radius:var(--radius-sm); padding:14px; margin:18px 0;">
          <div class="summary-line" style="margin:4px 0;"><span>Subtotal (${state.cart.reduce((s, i) => s + i.qty, 0)} ${state.cart.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "itens"})</span><span>${brl(subtotal)}</span></div>
          ${discount > 0 ? `<div class="summary-line" style="margin:4px 0; color:var(--success);"><span>Cupom</span><span>− ${brl(discount)}</span></div>` : ""}
          <div class="summary-line" style="margin:4px 0;"><span>Frete</span><span>${shippingCost === 0 ? "Grátis" : brl(shippingCost)}</span></div>
          ${checkoutPaymentMethod === "pix" ? `<div class="summary-line" style="margin:4px 0; color:var(--success);"><span>Desconto Pix (5%)</span><span>− ${brl(total - pixTotal)}</span></div>` : ""}
          <div class="summary-line summary-total" style="margin:8px 0 0; padding-top:8px;"><span>Total a Pagar</span><span>${brl(finalTotal)}</span></div>
        </div>

        <button class="btn" type="submit" style="width:100%">Confirmar Pedido · ${brl(finalTotal)}</button>
      </form>
    `;
    animateCheckoutCard();
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    if (checkoutPaymentMethod === "card") {
      const cardInput = $("#coCard");
      const expiryInput = $("#coCardExpiry");
      const cardDigits = cardInput.value.replace(/\D/g, "");
      const [expiryMonth, expiryYear] = expiryInput.value.split("/");
      const expiryDate = new Date(
        2000 + Number(expiryYear),
        Number(expiryMonth),
        0,
        23,
        59,
        59,
      );

      cardInput.setCustomValidity(
        cardDigits.length < 13 || cardDigits.length > 19
          ? "Digite um número de cartão com 13 a 19 números."
          : "",
      );
      expiryInput.setCustomValidity(
        expiryDate < new Date() ? "O cartão está vencido." : "",
      );
      if (!e.currentTarget.reportValidity()) return;
    }

    const { total } = computeCartTotals();
    const finalTotal = checkoutPaymentMethod === "pix" ? total * 0.95 : total;
    const code = `MT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const etaDate = new Date(now.getTime() + 5 * 86400000);

    const newOrder = {
      code,
      date: now.toLocaleDateString("pt-BR"),
      customer: $("#coName").value.trim(),
      email: $("#coEmail").value.trim(),
      address: `${$("#coAddress").value.trim()} — ${$("#coCity").value.trim()} (${$("#coCep").value.trim()})`,
      statusStep: 1,
      eta: etaDate.toLocaleDateString("pt-BR"),
      payment:
        checkoutPaymentMethod === "pix"
          ? "Pix (5% OFF)"
          : checkoutPaymentMethod === "card"
            ? "Cartão de Crédito"
            : "Boleto Bancário",
      shippingLabel:
        state.shipping.method === "sedex"
          ? "SEDEX Expresso"
          : state.shipping.method === "pickup"
            ? "Retirada em Atelier"
            : "PAC Econômico",
      total: finalTotal,
      items: state.cart.map((item) => {
        const p = getProduct(item.id);
        return {
          id: item.id,
          name: p.name,
          size: item.size,
          qty: item.qty,
          price: p.price,
        };
      }),
    };

    state.orders.unshift(newOrder);
    saveLS("maretwin_orders", state.orders);

    state.cart = [];
    state.coupon = null;
    saveLS("maretwin_cart", state.cart);
    saveLS("maretwin_coupon", null);
    updateBadges();
    renderCart();

    const fakePix = `00020126580014BR.GOV.BCB.PIX0136maretwin-${code.toLowerCase()}5204000053039865802BR5909MARETWIN6009BRASIL`;

    $("#checkoutModalContent").innerHTML = `
      <div style="text-align:center; padding:12px 0;">
        <div style="width:56px; height:56px; border-radius:50%; background:var(--success-bg); color:var(--success); display:inline-grid; place-items:center; font-size:26px; margin-bottom:12px;">✓</div>
        <div class="eyebrow">Pedido Confirmado</div>
        <h2 style="font-family:var(--font-serif); font-size:34px; margin:6px 0;">Obrigada, ${newOrder.customer.split(" ")[0]}!</h2>
        <p style="color:var(--muted); font-size:14px;">Seu pedido <strong style="color:var(--gold-deep)">${newOrder.code}</strong> foi registrado com sucesso.</p>
      </div>
      <div style="background:var(--linen); border:1px solid var(--line); border-radius:var(--radius-sm); padding:16px; font-size:13px; margin:16px 0;">
        <p style="margin:0 0 6px;"><strong>Entrega:</strong> ${newOrder.address}</p>
        <p style="margin:0 0 6px;"><strong>Pagamento:</strong> ${newOrder.payment} · <strong>Total:</strong> ${brl(newOrder.total)}</p>
        <p style="margin:0;"><strong>Previsão estimada:</strong> ${newOrder.eta}</p>
        ${checkoutPaymentMethod === "pix" ? `<div class="pix-box"><strong>Pix Copia e Cola:</strong><br>${fakePix}</div>` : ""}
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button type="button" class="btn" id="goTrackNewOrderBtn" data-track-code="${newOrder.code}" style="flex:1">Rastrear Pedido Agora</button>
        <button type="button" class="btn soft" data-close-modal="checkoutModal" style="flex:1">Voltar à Loja</button>
      </div>
    `;
    showToast(`✦ Pedido ${code} confirmado!`);
  }

  // ---------- VIEW 5: SUPORTE ----------
  function renderSupport() {
    renderFAQs("");
    renderRecentOrderChips();
    renderTickets();
  }

  function renderFAQs(query) {
    const q = (query || "").trim().toLowerCase();
    const filtered = FAQS.filter(
      (f) =>
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
    $("#faqList").innerHTML = filtered.length
      ? filtered
          .map(
            (f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`,
          )
          .join("")
      : `<p style="font-size:13px; color:var(--muted); padding:12px 0;">Nenhuma dúvida encontrada para "${query}". Envie sua pergunta no formulário ao lado!</p>`;
  }

  function renderRecentOrderChips() {
    $("#recentOrderChips").innerHTML = `
      <span style="font-size:11px; color:var(--muted); align-self:center;">Pedidos disponíveis:</span>
      ${state.orders
        .slice(0, 5)
        .map(
          (o) => `
        <button type="button" class="order-chip" data-fill-track="${o.code}">${o.code}</button>
      `,
        )
        .join("")}
    `;
  }

  function renderOrderTracking(codeRaw) {
    const code = (codeRaw || "").trim().toUpperCase();
    const order = state.orders.find((o) => o.code.toUpperCase() === code);
    const out = $("#trackOrderResult");

    if (!order) {
      out.innerHTML = `<div class="notice error show" style="margin-top:16px;">Pedido <strong>${code}</strong> não encontrado. Verifique o código ou clique em um dos pedidos listados acima.</div>`;
      return;
    }

    const stages = [
      { step: 1, title: "Pedido Confirmado", sub: `Em ${order.date}` },
      { step: 2, title: "Em Separação", sub: "Conferência no atelier" },
      { step: 3, title: "Em Trânsito", sub: order.shippingLabel },
      { step: 4, title: "Entregue", sub: `Previsão: ${order.eta}` },
    ];

    out.innerHTML = `
      <div style="margin-top:18px; padding-top:16px; border-top:1px solid var(--line-strong);">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; font-size:13px;">
          <div><strong>Pedido ${order.code}</strong> · ${order.customer}</div>
          <div>Total: <strong>${brl(order.total)}</strong> · ${order.payment}</div>
        </div>
        <div class="tracker-steps">
          ${stages
            .map(
              (s) => `
            <div class="tracker-step ${order.statusStep >= s.step ? "done" : ""}">
              <div class="step-dot">${order.statusStep >= s.step ? "✓" : s.step}</div>
              <strong>${s.title}</strong>
              <span>${s.sub}</span>
            </div>
          `,
            )
            .join("")}
        </div>
        <div style="margin-top:12px; font-size:12px; color:var(--ink-soft);">
          <strong>Itens:</strong> ${order.items.map((i) => `${i.qty}x ${i.name} (${i.size})`).join(", ")}
        </div>
      </div>
    `;
  }

  function renderTickets() {
    const box = $("#ticketsContainer");
    if (state.tickets.length === 0) {
      box.innerHTML = "";
      return;
    }
    box.innerHTML = `
      <h4 style="margin:0 0 8px; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold-deep);">Seus Chamados Recentes</h4>
      ${state.tickets
        .slice(0, 4)
        .map(
          (t) => `
        <div class="ticket-item">
          <div style="display:flex; justify-content:space-between; gap:8px;">
            <strong>${t.protocol} · ${t.topic}</strong>
            <span style="color:var(--success); font-weight:600;">Aberto</span>
          </div>
          <div style="color:var(--muted); margin-top:4px;">${t.date} ${t.order ? `· Pedido ${t.order}` : ""}</div>
          <p style="margin:6px 0 0;">${t.message}</p>
        </div>
      `,
        )
        .join("")}
    `;
  }

  // ---------- MODALS ----------
  function openModal(id) {
    $(`#${id}`).classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    $(`#${id}`).classList.remove("show");
    if (!$$(".modal-backdrop.show").length) document.body.style.overflow = "";
  }

  function openProductModal(productId) {
    const p = getProduct(productId);
    if (!p) return;
    const isFav = state.favs.includes(p.id);
    const chosenSize =
      state.selectedSizes[p.id] ||
      p.sizes[Math.min(1, p.sizes.length - 1)] ||
      p.sizes[0];

    $("#productModalContent").innerHTML = `
      <div class="modal-product">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <div class="eyebrow">${p.collection} · ${p.category}</div>
          <h2>${p.name}</h2>
          <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:10px;">
            <strong style="font-size:22px; color:var(--gold-deep);">${brl(p.price)}</strong>
            ${p.oldPrice ? `<span class="price-old">${brl(p.oldPrice)}</span>` : ""}
          </div>
          <p style="font-size:12px; color:var(--muted); margin:0 0 14px;">
            Ou <strong>${brl(p.price * 0.95)}</strong> no Pix (5% OFF) · até 6x de ${brl(p.price / 6)} sem juros
          </p>
          <p style="font-size:14px; color:var(--ink-soft); margin:0 0 16px;">${p.desc}</p>

          <div style="font-size:12px; background:var(--linen); border:1px solid var(--line); border-radius:var(--radius-sm); padding:12px; margin-bottom:16px;">
            <div style="margin-bottom:4px;"><strong>Composição:</strong> ${p.material}</div>
            <div><strong>Cuidados:</strong> ${p.care}</div>
          </div>

          <div style="font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:8px;">Selecione o Tamanho</div>
          <div class="size-row" id="modalSizeRow">
            ${p.sizes
              .map(
                (s) => `
              <button type="button" class="size-btn ${chosenSize === s ? "selected" : ""}" data-modal-size="${p.id}:${s}">${s}</button>
            `,
              )
              .join("")}
          </div>

          <div style="display:flex; gap:10px; margin-top:18px;">
            <button type="button" class="btn" id="modalAddCartBtn" data-id="${p.id}" style="flex:1">Adicionar ao Carrinho</button>
            <button type="button" class="btn soft" id="modalFavBtn" data-id="${p.id}">${isFav ? "♥ Salvo" : "♡ Favoritar"}</button>
          </div>
        </div>
      </div>
    `;
    openModal("productModal");
  }

  function renderFavsModal() {
    const box = $("#favsModalContent");
    const favProducts = state.favs.map(getProduct).filter(Boolean);
    if (favProducts.length === 0) {
      box.innerHTML = `
        <div class="empty-state" style="padding:36px 20px;">
          <h3>Nenhum favorito salvo</h3>
          <p>Clique no coração ♡ em qualquer peça para montar sua lista de desejos.</p>
          <button type="button" class="btn sm" data-close-modal="favsModal" data-nav="collections">Explorar Coleções</button>
        </div>
      `;
      return;
    }

    box.innerHTML = favProducts
      .map(
        (p) => `
      <div class="look-item" style="margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" style="cursor:pointer" data-open-product="${p.id}">
        <div>
          <strong>${p.name}</strong>
          <span>${p.collection} · ${brl(p.price)}</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button type="button" class="btn sm" data-fav-add="${p.id}">+ Carrinho</button>
          <button type="button" class="btn sm soft" data-toggle-fav="${p.id}" aria-label="Remover">✕</button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  function openPolicyModal(key) {
    const pol = POLICIES[key];
    if (!pol) return;
    $("#policyModalContent").innerHTML = `
      <div class="eyebrow">MARÉ TWIN · Institucional</div>
      <h2 style="font-family:var(--font-serif); font-size:32px; margin:6px 0 14px;">${pol.title}</h2>
      <div style="font-size:14px; color:var(--ink-soft); line-height:1.75;">${pol.body}</div>
    `;
    openModal("policyModal");
  }

  // ---------- Global Event Delegation ----------
  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      e.preventDefault();
      const closeId = navBtn.dataset.closeModal;
      if (closeId) closeModal(closeId);
      navigate(navBtn.dataset.nav);
      return;
    }

    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }

    if (e.target.classList.contains("modal-backdrop")) {
      closeModal(e.target.id);
      return;
    }

    const favBtn = e.target.closest("[data-toggle-fav]");
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(favBtn.dataset.toggleFav);
      return;
    }

    const sizeBtn = e.target.closest("[data-select-size]");
    if (sizeBtn) {
      const [id, sz] = sizeBtn.dataset.selectSize.split(":");
      state.selectedSizes[id] = sz;
      const row = sizeBtn.closest(".size-row");
      $$(".size-btn", row).forEach((b) =>
        b.classList.toggle("selected", b === sizeBtn),
      );
      return;
    }

    const modalSizeBtn = e.target.closest("[data-modal-size]");
    if (modalSizeBtn) {
      const [id, sz] = modalSizeBtn.dataset.modalSize.split(":");
      state.selectedSizes[id] = sz;
      $$("#modalSizeRow .size-btn").forEach((b) =>
        b.classList.toggle("selected", b === modalSizeBtn),
      );
      return;
    }

    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      addToCart(addBtn.dataset.addCart);
      return;
    }

    const openProd = e.target.closest("[data-open-product]");
    if (openProd) {
      closeModal("favsModal");
      openProductModal(openProd.dataset.openProduct);
      return;
    }

    if (e.target.id === "modalAddCartBtn") {
      addToCart(e.target.dataset.id);
      closeModal("productModal");
      return;
    }

    if (e.target.id === "modalFavBtn") {
      const id = e.target.dataset.id;
      toggleFavorite(id);
      e.target.textContent = state.favs.includes(id)
        ? "♥ Salvo"
        : "♡ Favoritar";
      return;
    }

    const favAdd = e.target.closest("[data-fav-add]");
    if (favAdd) {
      addToCart(favAdd.dataset.favAdd);
      return;
    }

    const colPill = e.target.closest("[data-collection-pill]");
    if (colPill) {
      state.activeCollection = colPill.dataset.collectionPill;
      renderCollection();
      return;
    }

    const jumpSession = e.target.closest("[data-jump-session]");
    if (jumpSession) {
      state.activeSession = jumpSession.dataset.jumpSession;
      navigate("sessions");
      return;
    }

    const selectSession = e.target.closest("[data-select-session]");
    if (selectSession) {
      state.activeSession = selectSession.dataset.selectSession;
      renderSessionsView();
      return;
    }

    const lookSizeBtn = e.target.closest("[data-look-size]");
    if (lookSizeBtn) {
      state.lookSize = lookSizeBtn.dataset.lookSize;
      $$("#lookSizeRow .size-btn").forEach((b) =>
        b.classList.toggle("selected", b === lookSizeBtn),
      );
      renderSessionsView();
      return;
    }

    const qtyBtn = e.target.closest("[data-cart-qty]");
    if (qtyBtn) {
      const [idxStr, deltaStr] = qtyBtn.dataset.cartQty.split(":");
      const idx = Number(idxStr);
      const delta = Number(deltaStr);
      if (state.cart[idx]) {
        state.cart[idx].qty += delta;
        if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
        saveLS("maretwin_cart", state.cart);
        updateBadges();
        renderCart();
      }
      return;
    }

    const removeBtn = e.target.closest("[data-cart-remove]");
    if (removeBtn) {
      state.cart.splice(Number(removeBtn.dataset.cartRemove), 1);
      saveLS("maretwin_cart", state.cart);
      updateBadges();
      renderCart();
      showToast("Item removido do carrinho.");
      return;
    }

    const shipOpt = e.target.closest("[data-choose-ship]");
    if (shipOpt) {
      const [method, price] = shipOpt.dataset.chooseShip.split(":");
      state.shipping.method = method;
      state.shipping.cost = Number(price);
      saveLS("maretwin_shipping", state.shipping);
      renderCart();
      return;
    }

    if (e.target.id === "removeCouponBtn") {
      state.coupon = null;
      saveLS("maretwin_coupon", null);
      renderCart();
      showToast("Cupom removido.");
      return;
    }

    if (e.target.id === "openCheckoutBtn") {
      openCheckoutModal();
      return;
    }

    const payTab = e.target.closest("[data-pay-tab]");
    if (payTab) {
      checkoutPaymentMethod = payTab.dataset.payTab;
      renderCheckoutForm();
      return;
    }

    if (e.target.id === "goTrackNewOrderBtn") {
      const code = e.target.dataset.trackCode;
      closeModal("checkoutModal");
      navigate("support");
      $("#trackOrderInput").value = code;
      renderOrderTracking(code);
      return;
    }

    const fillTrack = e.target.closest("[data-fill-track]");
    if (fillTrack) {
      const code = fillTrack.dataset.fillTrack;
      $("#trackOrderInput").value = code;
      renderOrderTracking(code);
      return;
    }

    const policyLink = e.target.closest("[data-policy]");
    if (policyLink) {
      e.preventDefault();
      openPolicyModal(policyLink.dataset.policy);
    }
  });

  // Inline Cart Size Change
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-change-cart-size]")) {
      const idx = Number(e.target.dataset.changeCartSize);
      if (state.cart[idx]) {
        state.cart[idx].size = e.target.value;
        saveLS("maretwin_cart", state.cart);
        showToast(`Tamanho atualizado para ${e.target.value}.`);
      }
    }
  });

  document.addEventListener("input", (e) => {
    const input = e.target;
    if (
      !input.matches("#coCardName, #coCard, #coCardExpiry, #coCardCvv")
    ) {
      return;
    }

    if (input.id === "coCard") {
      input.setCustomValidity("");
      const cursor = input.selectionStart ?? input.value.length;
      const digitsBeforeCursor = input.value
        .slice(0, cursor)
        .replace(/\D/g, "").length;
      const digits = input.value.replace(/\D/g, "").slice(0, 19);
      input.value = digits.replace(/(.{4})/g, "$1 ").trim();
      const cursorPosition = input.value
        .split("")
        .findIndex((_, index, value) => {
          const digitsAtPosition = value
            .slice(0, index + 1)
            .join("")
            .replace(/\D/g, "").length;
          return digitsAtPosition === digitsBeforeCursor;
        });
      input.setSelectionRange(
        cursorPosition < 0 ? input.value.length : cursorPosition + 1,
        cursorPosition < 0 ? input.value.length : cursorPosition + 1,
      );
    } else if (input.id === "coCardExpiry") {
      input.setCustomValidity("");
      const digits = input.value.replace(/\D/g, "").slice(0, 4);
      input.value =
        digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    } else if (input.id === "coCardCvv") {
      input.value = input.value.replace(/\D/g, "").slice(0, 4);
    }

    const previewFields = {
      coCardName: $("#previewCardName"),
      coCard: $("#previewCardNumber"),
      coCardExpiry: $("#previewCardExpiry"),
      coCardCvv: $("#previewCardCvv"),
    };
    const previewDefaults = {
      coCardName: "SEU NOME",
      coCard: "•••• •••• •••• ••••",
      coCardExpiry: "MM/AA",
      coCardCvv: "•••",
    };
    const previewValue =
      input.id === "coCardName" ? input.value.trim() : input.value;
    const previewField = previewFields[input.id];
    previewField.textContent = previewValue || previewDefaults[input.id];

    if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.gsap.fromTo(
        previewField,
        { opacity: 0.55, y: 4 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" },
      );
    }
  });

  document.addEventListener("focusin", (e) => {
    if (e.target.closest("#checkoutForm")) {
      const card = $("#checkoutCard");
      if (!card) return;

      const isFlipped = e.target.id === "coCardCvv";
      card.classList.toggle("is-flipped", isFlipped);
      if (window.gsap) {
        const rotationY = isFlipped ? 180 : 0;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          window.gsap.set(card, { rotationY });
        } else {
          window.gsap.to(card, {
            rotationY,
            duration: 0.72,
            ease: "power3.inOut",
            overwrite: "auto",
          });
        }
      }
    }
  });

  // Dynamic Forms (Cart CEP, Coupon, Checkout)
  document.addEventListener("submit", (e) => {
    if (e.target.id === "cepForm") {
      e.preventDefault();
      const digits = ($("#cepInput").value || "").replace(/\D/g, "");
      if (digits.length !== 8) {
        showToast("Digite um CEP válido com 8 números.");
        return;
      }
      const formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      const regionSeed = Number(digits[0]);
      const pacPrice = 24.9 + (regionSeed % 4) * 4;
      const sedexPrice = 42.9 + (regionSeed % 4) * 6;

      state.shipping = {
        cep: formatted,
        calculated: true,
        method: "pac",
        cost: pacPrice,
        options: [
          {
            id: "pac",
            name: "PAC Econômico",
            days: "5 a 7 dias úteis",
            price: pacPrice,
          },
          {
            id: "sedex",
            name: "SEDEX Expresso",
            days: "2 a 3 dias úteis",
            price: sedexPrice,
          },
          {
            id: "pickup",
            name: "Retirada em Atelier",
            days: "Pronto em 24h",
            price: 0,
          },
        ],
      };
      saveLS("maretwin_shipping", state.shipping);
      renderCart();
      showToast(`Frete calculado para CEP ${formatted}!`);
      return;
    }

    if (e.target.id === "couponForm") {
      e.preventDefault();
      const code = ($("#couponInput").value || "").trim().toUpperCase();
      if (COUPONS[code]) {
        state.coupon = COUPONS[code];
        saveLS("maretwin_coupon", state.coupon);
        renderCart();
        showToast(`✦ Cupom ${code} (${COUPONS[code].label}) aplicado!`);
      } else {
        showToast(
          "Cupom inválido. Tente MARETWIN10, PRIMEIRACOMPRA ou FRETEGRATIS.",
        );
      }
      return;
    }

    if (e.target.id === "checkoutForm") {
      handleCheckoutSubmit(e);
    }
  });

  // Static Controls & Forms
  $("#quickSearchBtn").addEventListener("click", () => {
    navigate("collections");
    setTimeout(() => $("#searchInput").focus(), 200);
  });

  $("#openFavsBtn").addEventListener("click", () => {
    renderFavsModal();
    openModal("favsModal");
  });

  $("#searchInput").addEventListener("input", renderCollection);
  $("#categoryFilter").addEventListener("change", renderCollection);
  $("#sizeFilter").addEventListener("change", renderCollection);
  $("#sortFilter").addEventListener("change", renderCollection);
  $("#onlyFavsToggle").addEventListener("click", () => {
    state.onlyFavs = !state.onlyFavs;
    renderCollection();
  });
  $("#clearFiltersBtn").addEventListener("click", resetCollectionFilters);
  $("#resetEmptyFiltersBtn").addEventListener("click", resetCollectionFilters);

  $("#clearCartBtn").addEventListener("click", () => {
    state.cart = [];
    saveLS("maretwin_cart", state.cart);
    updateBadges();
    renderCart();
    showToast("Carrinho esvaziado.");
  });

  // Newsletter
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    if (!email) return;
    const notice = $("#newsletterNotice");
    notice.innerHTML = `Bem-vinda ao Clube Maré Twin! Use o cupom <strong>MARETWIN10</strong> no carrinho para 10% OFF.`;
    notice.classList.add("show");
    $("#newsletterEmail").value = "";
    showToast("✦ Cupom MARETWIN10 desbloqueado!");
  });

  // Size Finder in Sessions
  $("#sizeFinderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const bust = Number($("#sfBust").value);
    const waist = Number($("#sfWaist").value);
    const hip = Number($("#sfHip").value);
    const fit = $("#sfFit").value;

    let score = (bust - 82) * 0.4 + (waist - 64) * 0.3 + (hip - 90) * 0.3;
    if (fit === "amplo") score += 5;
    if (fit === "justo") score -= 3;

    let size = "M";
    if (score < 4) size = "PP";
    else if (score < 10) size = "P";
    else if (score < 17) size = "M";
    else if (score < 24) size = "G";
    else size = "GG";

    const box = $("#sizeResultBox");
    box.innerHTML = `
      <div class="eyebrow">Recomendação Personalizada</div>
      <strong>Tamanho ideal: ${size}</strong>
      <p style="margin:6px 0 0; font-size:13px; color:var(--ink-soft);">
        Para o seu perfil (${bust}/${waist}/${hip} cm) com preferência de caimento <strong>${fit}</strong>, recomendamos o tamanho <strong>${size}</strong> nas modelagens da MARÉ TWIN.
      </p>
    `;
    box.classList.add("show");
  });

  // Add Complete Look Bundle
  $("#addLookBundleBtn").addEventListener("click", () => {
    LOOK_IDS.forEach((id) => {
      const p = getProduct(id);
      const sz = p.sizes.includes("Único") ? "Único" : state.lookSize;
      addToCart(id, sz, 1, true);
    });
    if (!state.coupon) {
      state.coupon = COUPONS.MARETWIN10;
      saveLS("maretwin_coupon", state.coupon);
    }
    showToast("✦ Look Completo adicionado + 10% OFF (MARETWIN10) aplicado!");
    navigate("cart");
  });

  // Support: Order Tracker, FAQ search, Ticket Form
  $("#trackOrderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    renderOrderTracking($("#trackOrderInput").value);
  });

  $("#faqSearch").addEventListener("input", (e) => renderFAQs(e.target.value));

  $("#supportForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const protocol = `ATD-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket = {
      protocol,
      topic: $("#supportTopic").value,
      name: $("#supportName").value.trim(),
      email: $("#supportEmail").value.trim(),
      order: $("#supportOrder").value.trim(),
      message: $("#supportMessage").value.trim(),
      date: new Date().toLocaleDateString("pt-BR"),
    };
    state.tickets.unshift(ticket);
    saveLS("maretwin_tickets", state.tickets);

    const notice = $("#supportNotice");
    notice.innerHTML = `✓ Atendimento registrado com sucesso! Protocolo <strong>${protocol}</strong>. Nossa equipe responderá em até 1 dia útil.`;
    notice.classList.add("show");
    e.target.reset();
    renderTickets();
    showToast(`Protocolo ${protocol} criado!`);
  });

  // Escape closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".modal-backdrop.show").forEach((m) => closeModal(m.id));
    }
  });

  // ---------- Init ----------
  $("#year").textContent = new Date().getFullYear();
  updateBadges();
  renderHome();
  renderSessionsView();

  const initialHash = (window.location.hash || "").replace("#", "");
  if (
    ["home", "collections", "sessions", "cart", "support"].includes(initialHash)
  ) {
    navigate(initialHash);
  }
})();
