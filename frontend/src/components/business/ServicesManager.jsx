import { useEffect, useState } from "react";
import axios from "axios";

import { useBusiness } from "../../context/BusinessContext";

import { Card, CardContent } from "../ui/Card";
import Button from "../ui/Button";

const ServicesManager = () => {
  const { business } = useBusiness();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const fetchServices = async () => {
    if (!business) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/api/services/${business.id}`
      );

      setServices(res.data.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async () => {
    if (!newService.name || !newService.price || !newService.duration) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/services/${business.id}`,
        {
          name: newService.name,
          price: Number(newService.price),
          duration: Number(newService.duration),
          description: newService.description,
        }
      );

      setNewService({
        name: "",
        price: "",
        duration: "",
        description: "",
      });

      setShowForm(false);

      await fetchServices();

    } catch (err) {
      console.error(err);
      alert("Failed to save service.");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/services/${id}`
      );

      await fetchServices();

    } catch (err) {
      console.error(err);
      alert("Failed to delete service.");
    }
  };

  useEffect(() => {
    const handleAddService = async () => {
  if (!newSvc.name) return;

  try {
    const res = await axios.post(
      `http://localhost:3000/api/services/${business.id}`,
      {
        name: newSvc.name,
        price: Number(newSvc.price),
        duration: Number(newSvc.duration),
        description: "",
      }
    );

    setServices((prev) => [...prev, res.data.service]);

    setNewSvc({
      name: "",
      category: "Hair",
      price: "",
      duration: "",
    });

    setAdding(false);

  } catch (err) {
    console.error(err);
  }
};
    if (business) {
      fetchServices();
    }
  }, [business]);

  if (loading) {
    return <p>Loading Services...</p>;
  }

  return (
    <Card>
      <CardContent>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Services
          </h2>

          <Button onClick={() => setShowForm(!showForm)}>
            Add Service
          </Button>
        </div>

        {showForm && (
          <Card className="mb-5">
            <CardContent>

              <div className="grid gap-4">

                <input
                  name="name"
                  className="border rounded-lg p-3"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  name="price"
                  className="border rounded-lg p-3"
                  placeholder="Price"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  name="duration"
                  className="border rounded-lg p-3"
                  placeholder="Duration (minutes)"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      duration: e.target.value,
                    })
                  }
                />

                <textarea
                  name="description"
                  className="border rounded-lg p-3"
                  placeholder="Description"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                />

                <Button onClick={handleSaveService}>
                  Save Service
                </Button>
              </div>

            </CardContent>
          </Card>
        )}

        <div className="space-y-3">

          {services?.map((service) => (

            <div
              key={service.id}
              className="flex items-center justify-between border border-border-light rounded-xl p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {service.name}
                </h3>

                <p className="text-sm text-text-secondary">
                  ₹{service.price} • {service.duration} min
                </p>

              </div>

              <Button
                variant="danger"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </Button>

            </div>

          ))}

        </div>

      </CardContent>
    </Card>
  );
};

export default ServicesManager;