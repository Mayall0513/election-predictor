import '../styles/global.css'

export default function _app({ Component, pageProps }) {
  return (
    <div className="root">
      <Component { ...pageProps } /> 
    </div>
    );
};
