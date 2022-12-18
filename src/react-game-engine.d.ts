declare module "react-game-engine" {
  export type GameEngineProps = {
    className: string;
    systems: { (entities: any, {input: any}?): any }[];
    entities: {} | Promise<{}>;
    renderer?: { (entities, screen): void };
    timer?: {};
    running?: boolean;
    onEvent?: { (): void };
    style?: {};
    children?: JSX.Element;
  };

  export function GameEngine(props: GameEngineProps);
}
