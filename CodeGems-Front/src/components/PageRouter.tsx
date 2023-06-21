'use client'
import { PageData } from '@/protocols'
import { Pagination } from '@nextui-org/react'

export function PageRouter({ total, page, setPage }: PageData) {
  return (
    <div className="absolute bottom-0 mb-4 flex w-full justify-center">
      <Pagination
        radius="full"
        total={total}
        initialPage={1}
        page={page}
        onChange={(a) => setPage(a)}
        color="primary"
        size="xs"
      />
    </div>
  )
}
