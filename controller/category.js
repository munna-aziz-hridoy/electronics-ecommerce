import { Response } from '@helper/response'
import { getSlug } from '@helper/slug'
import { Category } from '@models/category'

import { v4 as uuid } from 'uuid'

const response = new Response()

// -------- category -------- //

export const category = async (req, res) => {
  //---- get categories

  if (req.method === 'GET') {
    try {
      const result = await Category.find({}, '-_id -created_at -__v')

      response.SUCCESS(res, result)
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error)
    }
  }

  //----   create category
  else if (req.method === 'POST') {
    const { name, parent_id } = JSON.parse(req.body)

    if (!name) return response.BAD_REQUEST(res, "Name can't be empty")

    try {
      const slug = getSlug(name)
      const id = uuid()

      const category = new Category({
        name,
        slug,
        parent_id: parent_id || null,
        id,
      })

      const result = await category.save()

      response.CREATED(res, result)
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error)
    }
  }
}

// -------- sub category -------- //

export const subCategory = async (req, res) => {
  const id = req.query.id

  //---- get sub categories

  if (req.method === 'GET') {
    try {
      const result = await Category.find({ parent_id: id })

      response.SUCCESS(res, result)
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error)
    }
  }

  //----   update category
  else if (req.method === 'PATCH') {
    const { name, parent_id } = JSON.parse(req.body)

    if (!name) response.BAD_REQUEST(res, "Name can't be empty")

    try {
      const filter = { id }
      let doc

      const slug = getSlug(name)

      if (parent_id) {
        doc = {
          name,
          slug,
          parent_id,
        }
      } else {
        doc = {
          name,
          slug,
        }
      }

      const result = await Category.findOneAndUpdate(filter, doc)

      response.SUCCESS(res, result)
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error)
    }
  }

  //---- delete category
  else if (req.method === 'DELETE') {
    try {
      const result = await Category.findOneAndDelete({ id })

      response.SUCCESS(res, result)
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error)
    }
  }
}
