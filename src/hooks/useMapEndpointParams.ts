export function useMapEndpointParams(options: (() => React.JSX.Element)[]) {
  return options
    .map((option: any) => {
      return option.value;
    })
    .join(",");
}
