import categoriesData from './categories.json'

export interface CategoryInfo {
  name: string
  subtitle: string
  description: string
  image: string
}

export function getCategoryInfo(category: string): CategoryInfo | null {
  return (categoriesData as Record<string, CategoryInfo>)[category] || null
}

export function getAllCategories(): string[] {
  return Object.keys(categoriesData)
}

export function getAllCategoriesInfo(): CategoryInfo[] {
  return Object.values(categoriesData as Record<string, CategoryInfo>)
}

