window.api = (function () {
  function regSolvesListener(callback) {
    kernel.regListener("api", "time", (_, time) => {
      const dnf = time[2][0] === -1;
      if (dnf) {
        callback({ dnf: true });
        return
      }

      callback({
        reconstruction: time[4][0],
        time: time[2][1],
      });
    });
  }

  function importScramble(str) {
    kernel.hideDialog();
    window._clearSession();

    window._importScrambles(str);

    window._resetTimer();
    setTimeout(() => {
      window._scrambleVirtual();
    }, 0);
  }

  function tweakStyles() {
    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

      #wndctn > div, .dialog, #gray, #avgstr, .difflabel {
        visibility: hidden !important;
        position: absolute;
      }
      body {
        background-color: #11191F !important;
      }
      .click {
        color: #A0A3A5 !important;
      }
      .activetimer {
        color: #FFFFFF !important;
      }
      .click, .activetimer {
        font-family: 'Space Grotesk', sans-serif !important;
      }
      .click {
        font-size: 24px !important;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  function setInputModeToVirtual() {
    window.kernel.setProp("input", "v");
  }

  return {
    setup: function (solvesListener) {
      tweakStyles();
      setInputModeToVirtual();
      regSolvesListener(solvesListener);
    },
    importScramble: importScramble,
  };
})();
