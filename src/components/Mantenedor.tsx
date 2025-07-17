import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: "activo" | "inactivo";
  fechaCreacion: string;
  fechaModificacion: string;
}

interface MantenedorProps {
  user: any;
}

const Mantenedor: React.FC<MantenedorProps> = ({ user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Datos de ejemplo
  const initialItems: Item[] = [
    {
      id: 1,
      nombre: "Proyecto A",
      descripcion: "Descripción del proyecto A",
      categoria: "Desarrollo",
      estado: "activo",
      fechaCreacion: "2024-01-15",
      fechaModificacion: "2024-01-20",
    },
    {
      id: 2,
      nombre: "Proyecto B",
      descripcion: "Descripción del proyecto B",
      categoria: "Marketing",
      estado: "activo",
      fechaCreacion: "2024-01-10",
      fechaModificacion: "2024-01-18",
    },
    {
      id: 3,
      nombre: "Proyecto C",
      descripcion: "Descripción del proyecto C",
      categoria: "Desarrollo",
      estado: "inactivo",
      fechaCreacion: "2024-01-05",
      fechaModificacion: "2024-01-12",
    },
  ];

  useEffect(() => {
    // Simular carga de datos
    setItems(initialItems);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    estado: "activo" as "activo" | "inactivo",
  });

  const categorias = [
    "Desarrollo",
    "Marketing",
    "Ventas",
    "Soporte",
    "Administración",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular operación de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingItem) {
        // Actualizar item existente
        const updatedItems = items.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...formData,
                fechaModificacion: new Date().toISOString().split("T")[0],
              }
            : item
        );
        setItems(updatedItems);
      } else {
        // Crear nuevo item
        const newItem: Item = {
          id: Math.max(...items.map((item) => item.id)) + 1,
          ...formData,
          fechaCreacion: new Date().toISOString().split("T")[0],
          fechaModificacion: new Date().toISOString().split("T")[0],
        };
        setItems([...items, newItem]);
      }

      handleCloseForm();
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.categoria,
      estado: item.estado,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este elemento?")
    ) {
      setIsLoading(true);
      try {
        // Simular operación de eliminación
        await new Promise((resolve) => setTimeout(resolve, 500));
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setFormData({
      nombre: "",
      descripcion: "",
      categoria: "",
      estado: "activo",
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filterCategory || item.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Mantenedor
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Gestiona los elementos del sistema
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buscar
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o descripción..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoría
            </label>
            <select
              id="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              + Nuevo Elemento
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de elementos - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Modificación
                </th>
                <th className="px-4 sm:px-6 -3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.nombre}
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {item.descripcion}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.estado === "activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.fechaModificacion}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron elementos</p>
          </div>
        )}
      </div>

      {/* Cards de elementos - Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {item.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{item.descripcion}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {item.categoria}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  item.estado === "activo"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.estado}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Modificado: {item.fechaModificacion}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron elementos</p>
          </div>
        )}
      </div>

      {/* Modal del formulario */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingItem ? "Editar Elemento" : "Nuevo Elemento"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Categoría *
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isLoading
                      ? "Guardando..."
                      : editingItem
                      ? "Actualizar"
                      : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mantenedor;
