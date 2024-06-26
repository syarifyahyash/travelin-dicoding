class AppNav extends HTMLElement {
  connectedCallback() {
    this.render();
    this._addClickOutsideListener();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar fixed-top navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <div class="navbar-brand">
            <!-- Logo -->
              <img data-src="./logo-tanpa-bg.png" alt="Logo" class="logo-img lazyload"/>
            <!-- Nama aplikasi-->
            <a class="nav-link text-white" href="#/"><h1 class="h3">Travel in</h1></a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link text-white" href="#/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/cultures">Cultures</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/tourism">Tourism's</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/about">About Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  _addClickOutsideListener() {
    document.addEventListener('click', (event) => {
      const navbarCollapse = this.querySelector('.navbar-collapse');
      const isClickInsideNavbar = this.contains(event.target);
      if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
        // eslint-disable-next-line no-undef
        $(navbarCollapse).collapse('hide');
      }
    });
  }
}

customElements.define("app-nav", AppNav);
