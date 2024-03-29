type Instance = {
  tabId: string;
  windowId: string;
  webviewId: string;
  websessionId: string;
};

let instance: Instance | null = null;

const title = "Backcountry";

const focusInstance = async () => {
  if (instance) {
    await ext.windows.restore(instance.windowId);
    await ext.windows.focus(instance.windowId);
  }
};

const destroyInstance = async () => {
  if (instance) {
    await ext.windows.remove(instance.windowId);
    await ext.tabs.remove(instance.tabId);
    await ext.webviews.remove(instance.webviewId);
    await ext.websessions.remove(instance.websessionId);
    instance = null;
  }
};

ext.runtime.onExtensionClick.addListener(async () => {
  if (instance) {
    await focusInstance();
    return;
  }

  let webview: ext.webviews.Webview | null = null;
  let websession: ext.websessions.Websession | null = null;
  let window: ext.windows.Window | null = null;
  let tab: ext.tabs.Tab | null = null;

  try {
    tab = await ext.tabs.create({
      text: title,
      icon: "./assets/128.png",
      mutable: true,
    });

    window = await ext.windows.create({
      center: true,
      fullscreenable: false,
      resizable: false,
      title,
      icon: "./assets/128.png",
      vibrancy: false,
      frame: false,
      titleBarStyle: "inset",
      width: 1200,
      height: 800,
    });

    const contentSize = await ext.windows.getContentSize(window.id);

    const permissions = await ext.runtime.getPermissions();
    const persistent =
      (permissions["websessions"] ?? {})["create.persistent"]?.granted ?? false;

    websession = await ext.websessions.create({
      partition: title,
      persistent,
      global: false,
    });
    webview = await ext.webviews.create({
      window,
      websession,
      autoResize: { horizontal: true, vertical: true },
      bounds: { ...contentSize, x: 0, y: 0 },
    });

    await ext.webviews.loadFile(webview.id, "index.html");
    // await ext.webviews.openDevTools(webview.id, {
    //   mode: "detach",
    //   activate: true,
    // });

    await ext.windows.focus(window.id);
    await ext.webviews.focus(webview.id);

    instance = {
      tabId: tab.id,
      windowId: window.id,
      websessionId: websession.id,
      webviewId: webview.id,
    };
  } catch (error) {
    console.error("ext.runtime.onExtensionClick", JSON.stringify(error));

    if (window) await ext.windows.remove(window.id);
    if (tab) await ext.tabs.remove(tab.id);
    if (websession) await ext.websessions.remove(websession.id);
    if (webview) await ext.webviews.remove(webview.id);
  }
});

ext.tabs.onClicked.addListener(async () => {
  try {
    await focusInstance();
  } catch (error) {
    console.log(error, "ext.tabs.onClicked");
  }
});

ext.tabs.onClickedMute.addListener(async () => {
  try {
    if (instance) {
      const muted = await ext.webviews.isAudioMuted(instance.webviewId);
      await ext.webviews.setAudioMuted(instance.webviewId, !muted);
      await ext.tabs.update(instance.tabId, { muted: !muted });
    }
  } catch (error) {
    console.log(error, "ext.tabs.onClickedMute");
  }
});

ext.tabs.onClickedClose.addListener(async () => {
  try {
    await destroyInstance();
  } catch (error) {
    console.log(error, "ext.tabs.onClickedClose");
  }
});

ext.tabs.onRemoved.addListener(async () => {
  try {
    await destroyInstance();
  } catch (error) {
    console.log(error, "ext.tabs.onRemoved");
  }
});

ext.windows.onClosed.addListener(async () => {
  try {
    await destroyInstance();
  } catch (error) {
    console.log(error, "ext.windows.onClosed");
  }
});

ext.windows.onRemoved.addListener(async () => {
  try {
    await destroyInstance();
  } catch (error) {
    console.log(error, "ext.windows.onRemoved");
  }
});

// ext.windows.onUpdatedDarkMode.addListener(async (event, details) => {
//   try {
//     await ext.windows.update(event.id, {
//       icon: details.enabled ? "./assets/128.png" : "./assets/128-dark.png",
//     });
//   } catch (error) {
//     console.log(error, "ext.windows.onUpdatedDarkMode");
//   }
// });
