import styles from './styles.module.scss'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'


export default function Category(){

  async function handleRegisterCategory(formData: FormData){
    "use server"
   

    const name = formData.get("name")

    if(name === "") return;

    const data = {
      name: name,
    }

    const token = await getCookieServer();

    await api.post("/category", data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .catch((err)=>{
      console.error(err);
      return;
    })

    redirect("/dashboard")
      
  }

  return(
    <main className={ styles.container}>
      <h1>Nova Categoria</h1>
      <form action={handleRegisterCategory} className={ styles.form }>
        <input
          type='text'
          name='name'
          required
          placeholder='Nome da categoria, ex: Pizzas'
          className={ styles.input }
        />

        <Button name='Cadastrar'/>

      </form>
    </main>
  )
}