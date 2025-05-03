"use client"

import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculateTotalOrder } from '@/lib/helper'


export function Modalorder(){

  const { onRequestClose, order, finishOrder } = use( OrderContext );

  async function handleFinishOrder(){
    await finishOrder(order[0].order.id);
    
  } 

  return(
    <dialog className={ styles.dialogContainer }>
      <section className={ styles.dialogContent }>
        <h2 className={ styles.textDetail }>Detalhes do pedido</h2>
        <button className={ styles.dialogBack }
        onClick={ onRequestClose }
        >
          <X size={40} />
          
        </button>
          <article className={ styles.container }>
              <span className={ styles.table }>
                Mesa <b>{ order[0].order.table }</b>
              </span>

                { order.map( item =>(
                  <section className={ styles.containerItem } key={item.id}>
                    <span>
                      Qtd: {item.amount} - Item: <b>{item.product.name}
                      </b> - R$ {(parseFloat(item.product.price) * item.amount).toFixed(2).replace(".", ",")}
                    </span>
                  </section>
                ))}

                <h3 className={ styles.valueTotal }> Valor Total: R$ {calculateTotalOrder(order).toFixed(2).replace(".", ",")} </h3>

              <button className={ styles.buttonOrder } onClick={handleFinishOrder} >
                Concluir pedido
              </button>
          </article>
      </section>
    </dialog>
  )
}