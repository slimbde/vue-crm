
export default {
  bind(el, { value }) {
    M.Tooltip.init(el, { html: value, position: 'left' });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);
    tooltip && tooltip.destroy && tooltip.destroy();
  }
}