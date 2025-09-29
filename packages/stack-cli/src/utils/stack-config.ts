type TConfig = {
  workspaceName?: string;
  packages?: Record<
    string,
    {
      name: string;
      version: string;
      path: string;
    }
  >;
};

export const config: TConfig = {};
