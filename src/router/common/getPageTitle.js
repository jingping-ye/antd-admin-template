import { defaultSetting } from "@/setting";

const defaultTitle = defaultSetting.title;

const getPageTitle = function(title) {
  return `${title} | ${defaultTitle}`;
};

export { getPageTitle };
