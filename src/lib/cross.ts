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
  try {
    if (options.method === 'GET' || options.method === undefined) {
      const queryParams = new URLSearchParams(
        Object.entries(options.data).map(([key, value]) => [key, String(value)])
      ).toString()
      url += (url.includes('?') ? '&' : '?') + queryParams
    }
    // 调用 fetch API
    const response = await fetch(url, options)

    // 检查 response.ok 状态，如果不成功抛出错误
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // 将响应解析为 JSON 并返回，假设响应内容是 JSON 格式
    const data = (await response.json()) as T
    return data
  } catch (error) {
    // 如果 handleError 为 true，自动处理错误
    // if (options.handleError) {
    //   console.error('Fetch error:', error)
    // }
    // 向调用方抛出错误，以便在外部捕获
    throw error
  }
  // return (
  //   await fetch(url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...(options?.headers || {}),
  //     },
  //     body: JSON.stringify(options.data),
  //   })
  // ).json()
}
