import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()
  
  // 测试读取 profiles 表（应该返回空数组，因为还没数据）
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(5)

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Supabase 连接测试</h1>
      {error ? (
        <p className="text-red-500">错误：{error.message}</p>
      ) : (
        <div>
          <p className="text-green-500">✅ 连接成功！</p>
          <p>profiles 表数据：{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  )
}
