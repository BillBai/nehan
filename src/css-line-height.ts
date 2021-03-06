import {
  Utils,
  HtmlElement,
  FlowContext,
  CssLength,
  Config
} from "./public-api";

export class CssLineHeight extends CssLength {
  constructor(css_text: string){
    super(css_text);
  }

  public computeKeywordSize(element: HtmlElement): number | null {
    if(this.cssText === "normal"){
      return this.computeInitialSize(element);
    }
    return null;
  }

  public computeInheritSize(element: HtmlElement): number {
    let parent = element.parent;
    if(!parent){
      return this.computeInitialSize(element);
    }
    let value = parent.computedStyle.getPropertyValue("line-height");
    if(value){
      return parseFloat(value);
    }
    return this.computeInitialSize(element);
  }

  public computeInitialSize(element: HtmlElement): number {
    return Config.defaultLineHeight;
  }

  public computePercentSize(element: HtmlElement, parent_ctx?: FlowContext): number {
    let percent = this.floatValue;
    let font_size = element.computedStyle.getPropertyValue("font-size");
    if(!font_size){
      throw new Error("line height can't be computed before font-size is computed.");
    }
    let base_size = Utils.atoi(font_size, 10);
    return base_size * percent / 100;
  }
}

