document.addEventListener('DOMContentLoaded', function () {
  const openNavBtn = document.querySelector("#openNav");
  const closeNavBtn = document.querySelector("#closeNav");
  const mySidebar = document.querySelector("#mySidebar");
  const mainContent = document.querySelector("#main");
  const openButton = document.querySelector(".openbtn");

  function openSidebar() {
    let sidebarWidth;
    if (window.innerWidth <= 490) {
      sidebarWidth = "100%";
    } else if (window.innerWidth <= 1024) {
      sidebarWidth = "50%";
    } else {
      sidebarWidth = "500px";
    }
    mySidebar.style.width = sidebarWidth;
    mySidebar.style.overflowY = "auto";
    mainContent.style.marginLeft = sidebarWidth;
    mainContent.style.filter = "brightness(50%)";
    openButton.style.opacity = "0";
    closeNavBtn.style.opacity = "1";
  }

  function closeSidebar() {
    mySidebar.style.width = "0";
    mySidebar.style.overflowY = "hidden";
    mainContent.style.marginLeft = "0";
    mainContent.style.filter = "brightness(100%)";
    openButton.style.opacity = "1";
    closeNavBtn.style.opacity = "0";

    const openPanels = document.querySelectorAll('.accordion-content.show');
    openPanels.forEach(panel => panel.classList.remove('show'));

    const activeButtons = document.querySelectorAll('.custom-accordion-button.active');
    activeButtons.forEach(btn => btn.classList.remove('active'));
  }

  function handleAccordionClick(event) {
    event.stopPropagation();
    const targetId = this.getAttribute('data-target');
    if (!targetId) return;

    const content = document.querySelector(targetId);
    if (!content) return;

    const isOpen = content.classList.contains('show');

    // Close siblings
    const group = this.closest('.accordion-group');
    if (group) {
      const allButtons = group.querySelectorAll('.custom-accordion-button');
      allButtons.forEach(btn => {
        const sibTarget = btn.getAttribute('data-target');
        const sibContent = document.querySelector(sibTarget);
        if (sibContent && sibContent !== content) {
          sibContent.classList.remove('show');
          btn.classList.remove('active');
        }
      });
    }

    // Toggle this panel
    content.classList.toggle('show', !isOpen);
    this.classList.toggle('active', !isOpen);
  }

  window.initializeAccordionListeners = function () {
    const buttons = document.querySelectorAll('.custom-accordion-button');
    buttons.forEach(btn => {
      btn.removeEventListener('click', handleAccordionClick);
      btn.addEventListener('click', handleAccordionClick);
    });
  };

  if (openNavBtn) openNavBtn.addEventListener('click', openSidebar);
  if (closeNavBtn) closeNavBtn.addEventListener('click', closeSidebar);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (mySidebar && mySidebar.style.width !== "0px" && mySidebar.style.width !== "") {
        openSidebar();
      }
    }, 300);
  });

  initializeAccordionListeners();
});


// ✅ JSON Loader with Deep Accordion Support
window.loadJsonAccordion = function ({ url, containerId, rootKey }) {
  const parent = document.getElementById(containerId);
  if (!parent) return;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const sectionData = data[rootKey];
      if (!sectionData) {
        parent.innerHTML = `<div class="error">❌ Key \"${rootKey}\" not found in JSON.</div>`;
        return;
      }

      const appSectionId = genId(`section_${rootKey}`);
      const outerGroup = document.createElement('div');
      outerGroup.className = 'accordion-group';

      outerGroup.innerHTML = `
        <div class="accordion-header">
          <h5 class="mb-0">
            <button class="custom-accordion-button" type="button" data-target="#${appSectionId}">
              ${rootKey}
            </button>
          </h5>
        </div>
        <div id="${appSectionId}" class="accordion-content">
          <div class="accordion-body custom-accordion"></div>
        </div>
      `;

      const containerBody = outerGroup.querySelector('.accordion-body');

      function buildAccordion(parentEl, label, val, parentId) {
        const thisId = genId(parentId + '_' + label);

        const wrapper = document.createElement('div');
        wrapper.className = 'accordion-group';

        wrapper.innerHTML = `
          <div class="accordion-header">
            <h5 class="mb-0">
              <button class="custom-accordion-button" type="button" data-target="#${thisId}">
                ${label}
              </button>
            </h5>
          </div>
          <div id="${thisId}" class="accordion-content">
            <div class="accordion-body"></div>
          </div>
        `;

        const thisBody = wrapper.querySelector('.accordion-body');

        if (typeof val === 'string') {
          thisBody.innerHTML = `<a href="${val}" target="_blank">${label}</a>`;
        } else if (typeof val === 'object') {
          Object.entries(val).forEach(([subLabel, subVal]) => {
            if (typeof subVal === 'string') {
              const div = document.createElement('div');
              div.innerHTML = `<a href="${subVal}" target="_blank">${subLabel}</a>`;
              thisBody.appendChild(div);
            } else if (typeof subVal === 'object') {
              buildAccordion(thisBody, subLabel, subVal, thisId);
            }
          });
        }

        parentEl.appendChild(wrapper);
      }

      Object.entries(sectionData).forEach(([section, val]) => {
        buildAccordion(containerBody, section, val, appSectionId);
      });

      parent.appendChild(outerGroup);
      initializeAccordionListeners();
    })
    .catch(err => {
      parent.innerHTML = `<div class="error">Error loading: ${err.message}</div>`;
    });
};

// Utility: Generate unique ID
function genId(label) {
  return (
    label.toLowerCase().replace(/[^a-z0-9]+/g, '_') +
    '_' +
    Math.random().toString(36).substring(2, 8)
  );
}
