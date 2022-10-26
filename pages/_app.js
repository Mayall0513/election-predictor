import '../styles/global.css'

export default ({ Component, pageProps }) => {
  /**
   * Wrap something here?
   */
  return (
    <Component { ...pageProps } />
  );
};
