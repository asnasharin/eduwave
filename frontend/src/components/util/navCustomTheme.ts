import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pr-4 pl-3 md:p-0",
      active: {
        on: "text-white dark:text-white md:bg-transparent md:text-[#8875FF] bg-[#8875FF]",
        off: "border-b border-[#8875FF]  text-white hover:bg-[#474073] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-[#8875FF] md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded p-2 text-sm text-white hover:bg-primary ms-4 focus:outline-none focus:ring-1 focus:ring-[#8875FF] dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
  dropdown: {
    arrowIcon: "ml-2 h-4 w-4",
    content: "py-1 focus:outline-none",
    floating: {
      animation: "transition-opacity",
      arrow: {
        base: "absolute z-10 h-2 w-2 rotate-45",
        style: {
          dark: "bg-gray-900 dark:bg-gray-700",
          light: "bg-white",
          auto: "bg-white dark:bg-gray-700",
        },
        placement: "-4px",
      },
      base: "z-10 w-fit rounded-md shadow focus:outline-none",
      content: "py-1 text-sm text-white dark:text-white",
      divider: "my-1 h-px bg-[#8875FF] dark:bg-gray-600",
      header: "block py-2 px-4 text-sm text-white dark:text-white",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex items-center justify-start py-2 px-4 text-sm text-white cursor-pointer w-full hover:bg-[#8875FF] focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#8875FF] focus:bg-[#8875FF] dark:hover:text-white dark:focus:bg-[#8875FF] dark:focus:text-white",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        dark: "bg-gray-900 text-white dark:bg-gray-700",
        light: "border-5 border-red-600 text-gray-900",
        auto: "ring-1 ring-[#8875FF] bg-secondary dark:border-none dark:bg-gray-700 dark:text-white",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  },
};
