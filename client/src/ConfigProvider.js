import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/en_GB";
// import "antd/dist/antd.variable.min.css";

// const booleen = false;
// const booleantrue = true;
ConfigProvider.config({
  // these One is realted to Color
  // Annd i camme to know that These 5 Color only play import Role in the Antd Desgin so no need of any less or acrco or third party App
  theme: {
    primaryColor: "#f06e38",
    // primaryColor: "red", // testing for purpose
    // errorColor: "red",
    // warningColor: "red",
    // successColor: "red",
    infoColor: "#f06e38",
  },
});

const ConfigProviderComponent = (props) => {
  return (
    <>
      <ConfigProvider
        // *****************************
        // ------------- direction we can pass ltr or rtl or
        direction="ltr"
        // *****************************
        // ------------- in the Local we cam pass around 70 languages
        locale={zhCN}
        // *****************************
        //  -------------componentSize like input and select and and button etc
        // ------------- and we can pass three values small middle large
        // componentSize={"medium"}
        // *****************************
        // ------------- for more infromation about these property Refer the Photo
        // autoInsertSpaceInButton={booleen}
        // *****************************
        // ------------- if u want to know more about these Property please visist these url below
        //  -------------https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
        //  -------------and csp start for Content Security Policy (CSP)
        // csp={{ nonce: "YourNonceCode" }}
        // *****************************
        // -------------To set the container of the popup element. The default is to create a div element in body
        //  -------------we must not use these One in the Configure becoz it will break the deafult behaviour of the Components which load outside of the Div
        // getPopupContainer={(trigger) => trigger.parentNode}
        //
        // ------------- Space Compoenet
        //  -------------and we can pass three values small middle large or any no
        // space={{
        //   size: "medium",
        // }}
        // *****************************
        //  -------------Set prefix className but dont use it at any cost
        // prefixCls="any class name(user-defined)"
        // *****************************
        //  -------------Set iconPrefixCls className but dont use it at any cost
        // iconPrefixCls="any class name(user-defined)"
        // *****************************
        //  ------------- PageHeader type, will change background color
        //  ------------- it will accept two values , i,e true and false
        // pageHeader={{ ghost: true }} // anthi background color transparent chesthadi ani ardam and default value is true and  for more example refeer to the Antd button ghost attribute
        // *****************************
        // -------------Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll
        // ----------- or  in another words It is used to determine whether the dropdown menu and the select input are the same widths or not.(** imp)
        // ---------- for example please refer these url https://stackblitz.com/edit/react-tg6r7v
        // ------------- boolean | number
        // dropdownMatchSelectWidth={booleantrue}
        // *****************************
        // ------------- boolean i.e it accepets ttrue or false
        // -------------Disable virtual scroll when set to false i.e its main theme is displace scrollar in Antd tree and any antd componnets if the data is more
        /// ---------- for more info pls visit these example https://stackblitz.com/edit/react-pehdgd
        // virtual={booleen}
        // *****************************
        /// ------------- Set empty content of components. Ref  antd Empty	function(componentName: string): ReactNode
        // ------------- It means we can change the default behaviour of table i.e we can can default box icons with user defined icons
        //-------------  for more infromation please visist these example : https://www.programmerall.com/article/588990497/
        // renderEmpty={() => {
        //    return  <div style={{ textAlign: 'center' }}>
        //     <Icon type="smile" style={{ fontSize: 20 }} />
        //              <p>Empty status information prompt</p>
        // </div>
        // }}
        // *****************************
        // -------------Config Affix, Anchor scroll target container
        // -------------() => HTMLElement
        //  -------------  see photo for more info about these Property
        // getTargetContainer
        // *****************************
        // -------------Set Form common props
        // ------------- { validateMessages?: ValidateMessages, requiredMark?: boolean | optional }
        //  -------------naku edi akkada refelect aenado dont know
        // form={{ validateMessages: " text message", requiredMark: { booleen } }}
        // *****************************
        // ------------- Set Input common props
        // input={{ autoComplete: " text message" }}
      >
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default ConfigProviderComponent;
