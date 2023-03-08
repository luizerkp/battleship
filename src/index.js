import "./css/normalize.css";
import "material-icons/iconfont/round.css";
import "./css/style.css";
import footer from "./footerContent";
import gameLoop from "./gameLoop";

gameLoop.start();
// buildPageContent
(() => {
  footer.buildFooter();
})();
