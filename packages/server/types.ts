export interface SSRModule {
  render: (uri: string, repository: any) => Promise<[Record<string, any>, string]>
}
