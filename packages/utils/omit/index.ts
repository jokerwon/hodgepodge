type isObject = { [key: string]: unknown } | object;

export function omit(srcObj: isObject, keys: string[] = []) {
  if (!keys || keys.length === 0) return srcObj;

  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(srcObj)) {
    if (keys.includes(k)) continue;

    if (typeof v === 'object' && v !== null) {
      result[k] = omit(v, keys);
    } else {
      result[k] = v;
    }
  }
  return result;
}
