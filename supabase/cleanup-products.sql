-- Limpiar duplicados de productos manteniéndose el primero de cada nombre
-- Ejecuta esto en SQL Editor de Supabase

DELETE FROM public.products
WHERE id NOT IN (
  SELECT DISTINCT ON (LOWER(name)) id
  FROM public.products
  ORDER BY LOWER(name), created_at ASC
);

-- Verificar duplicados que quedan
SELECT name, COUNT(*) as count
FROM public.products
GROUP BY LOWER(name)
HAVING COUNT(*) > 1;

-- Ver todos los productos con URLs sospechosas (sin extensión válida)
SELECT id, name, image_url, category
FROM public.products
WHERE image_url IS NOT NULL
  AND image_url NOT LIKE '%.jpg%'
  AND image_url NOT LIKE '%.png%'
  AND image_url NOT LIKE '%.webp%'
  AND image_url NOT LIKE '%.jpeg%';

-- Listar todos los productos para revisar manualmente
SELECT id, name, category, image_url, price, is_featured
FROM public.products
ORDER BY category, name;
