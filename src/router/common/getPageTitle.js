import { defaultSetting } from "@/setting";

const defaultTitle = defaultSetting.title;

const getPageTitle = function(title) {
  if (title) {
    return `${title} | ${defaultTitle}`;
  }
  {
    return defaultTitle;
  }
};

export { getPageTitle };
