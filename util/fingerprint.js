export const fingerprint = {
  // replaceWebGLInfoScript: (vendor, renderer) => `((v, r) => {
  //   const canvas = document.createElement('canvas');
  //   const gl = canvas.getContext("webgl");
  //   const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  //   const temp = WebGLRenderingContext.prototype.getParameter;
  //   WebGLRenderingContext.prototype.getParameter = (...args) => {
  //       if (args?.[0] === debugInfo.UNMASKED_VENDOR_WEBGL) {
  //           return v;
  //       }
  //       if (args?.[0] === debugInfo.UNMASKED_RENDERER_WEBGL) {
  //           return r;
  //       }
  //       return temp(...args);
  //   }
  // })('${vendor}', '${renderer}');`

  replaceWebGLInfoScript: (vendor, renderer) => `console.log('abobus');`
}