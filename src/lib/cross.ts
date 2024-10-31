type CrossOptions = Parameters<typeof fetch>[1] & {
  data: object
}

/**
 * 获取数据
 * @param url 请求地址
 * @param options 配置
 */
export const cross = async <T>(
  url: string,
  options: CrossOptions
): Promise<T> => {
  return (
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: JSON.stringify(options.data),
    })
  ).json()
}
