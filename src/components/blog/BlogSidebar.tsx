import { CategoryFilter } from './CategoryFilter';
import type { Category } from '@/types/sanity';

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function BlogSidebar({ categories, selectedCategory, onCategoryChange }: BlogSidebarProps) {
  return (
    <aside className="lg:w-80 space-y-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold font-[family-name:var(--font-acorn-medium)] text-gray-900 dark:text-white mb-4">About This Blog</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Welcome to my blog where I share thoughts, tutorials, and insights about web development, 
          technology, and creative coding. Stay tuned for regular updates!
        </p>
      </div>
    </aside>
  );
}
