export function classnames(...args: string[]) {
  return args.join(" ");
}

export const taskTitle = (title: string) => {
  return title.length > 30
    ? title.substring(0, 30).concat(" ..." + "더보기")
    : title;
};
