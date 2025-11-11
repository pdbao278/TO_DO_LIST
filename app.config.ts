interface IGlobalConfig {
  baseUrl: string;
}

const globalConfig: IGlobalConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://backend:5000",
};

export default globalConfig;
