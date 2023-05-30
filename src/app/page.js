import { db } from "@/lib/db"

const page = async function({}) {
  await db.set("foo", "baraaa")
  return <div>page</div>
}

export default page