import { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store, Phone, Mail, Globe, MapPin, Clock, Instagram, Facebook,
  Camera, Plus, Trash2, Check, ExternalLink, Star, Users, Edit3,
  Award, Image, ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useBusiness } from "../../context/BusinessContext";
import Input, { Textarea, Select } from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import GeneralInfo from "../../components/business/GeneralInfo";
import Toggle from '../../components/ui/Toggle';
import Avatar from '../../components/ui/Avatar';
import { businessProfile, businessTypes, indianCities, indianStates } from '../../data/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ── Tab: General Info ─────────────────────────────────────────
const GeneralTab = () => {
  const [p, setP] = useState(businessProfile);

  return (
    <div className="space-y-5">
      {/* Header card */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-border-light flex items-center justify-center">
                <Store className="w-10 h-10 text-primary" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary">{p.name}</h3>
              <p className="text-sm text-text-secondary">{p.tagline}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.achievements.map((a, i) => (
                  <Badge key={i} variant="info" size="sm">
                    <Award className="w-3 h-3 mr-1" />{a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" /> Basic Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Business Name" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
                <Select label="Category" value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })}>
                  {businessTypes.map((t) => <option key={t}>{t}</option>)}
                </Select>
              </div>
              <Input label="Tagline" value={p.tagline} onChange={(e) => setP({ ...p, tagline: e.target.value })} />
              <Textarea label="Business Description" value={p.description} rows={4}
                onChange={(e) => setP({ ...p, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Established Year" value={p.established} onChange={() => {}} />
                <Input label="GSTIN (optional)" value={p.gstin} onChange={() => {}} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" /> Contact Details
            </h3>
            <div className="space-y-3">
              <Input label="Primary Phone" value={p.phone} onChange={() => {}} icon={Phone} />
              <Input label="WhatsApp Number" value={p.whatsapp} onChange={() => {}} icon={Phone} />
              <Input label="Email" value={p.email} onChange={() => {}} icon={Mail} />
              <Input label="Website" value={p.website} onChange={() => {}} icon={Globe} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-success" /> Location
            </h3>
            <div className="space-y-3">
              <Input label="Street Address" value={p.address} onChange={() => {}} />
              <div className="grid grid-cols-2 gap-3">
                <Select label="City" value={p.city} onChange={() => {}}>
                  {indianCities.map((c) => <option key={c}>{c}</option>)}
                </Select>
                <Select label="State" value={p.state} onChange={() => {}}>
                  {indianStates.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </div>
              <Input label="Pincode" value={p.pincode} onChange={() => {}} />
              <button className="w-full flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light text-sm text-text-secondary hover:text-primary hover:border-primary/30 transition-colors">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> View on Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-500" /> Social Links
            </h3>
            <div className="space-y-3">
              <Input label="Instagram" value={p.social.instagram} onChange={() => {}} icon={Instagram} />
              <Input label="Facebook" value={p.social.facebook} onChange={() => {}} icon={Facebook} />
              <Input label="Google Business" value={p.social.google} onChange={() => {}} icon={Star} />
              <Input label="Google Maps URL" value={p.mapUrl} onChange={() => {}} icon={MapPin} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="primary" size="md">
        <Check className="w-4 h-4" /> Save Changes
      </Button>
    </div>
  );
};

// ── Tab: Services ─────────────────────────────────────────────
const ServicesTab = () => {
  const { business } = useBusiness();
  const [services, setServices] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newSvc, setNewSvc] = useState({ name: '', category: 'Hair', price: '', duration: '' });
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/services/${business.id}`
      );

      setServices(res.data.services);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (business?.id) {
      fetchServices();
    }
  }, [business]);

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/services/${serviceId}`
      );

      setServices((prev) =>
        prev.filter((service) => service.id !== serviceId)
      );

    } catch (err) {
      console.error("Delete failed:", err);
      alert("Unable to delete service.");
    }
  };

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

  const handleEditService = (service) => {
    setEditingService({
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
    });

    setAdding(true);
  };
  
  const handleUpdateService = async () => {
  try {

    console.log("Updating service:", editingService);

    console.log(
      "URL:",
      `http://localhost:3000/api/services/${editingService.id}`
    );

    const res = await axios.patch(
      `http://localhost:3000/api/services/${editingService.id}`,
      {
        name: editingService.name,
        price: Number(editingService.price),
        duration: Number(editingService.duration),
        description: editingService.description || "",
        active: editingService.active,
      }
    );

    setServices((prev) =>
      prev.map((service) =>
        service.id === editingService.id
          ? res.data.service
          : service
      )
    );

    setEditingService(null);

  } catch (err) {
  console.error("UPDATE ERROR:", err);
  console.error("RESPONSE:", err.response?.data);
  alert("Failed to update service");
}
};

  const handleCancelForm = () => {
    setAdding(false);
    setEditingService(null);
    setNewSvc({ name: '', category: 'Hair', price: '', duration: '' });
  };

  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">{services.filter((s) => s.active).length} active services</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">{cat}</p>
          <div className="space-y-2">
            {services.filter((s) => s.category === cat).map((svc, i) => (
              <motion.div key={svc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${
                  svc.active ? 'border-border-light bg-card' : 'border-border-light/50 bg-surface opacity-60'
                }`}>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{svc.name}</p>
                  <p className="text-xs text-text-tertiary">{svc.duration}</p>
                </div>
                <p className="text-base font-bold text-success">{svc.price}</p>
                <Toggle checked={svc.active}
                  onChange={(v) => setServices(services.map((s) => s.id === svc.id ? { ...s, active: v } : s))}
                  size="sm" />
                <button
                  onClick={() => handleEditService(svc)}
                  className="text-text-tertiary hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteService(svc.id)}
                  className="text-text-tertiary hover:text-danger transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Add / Edit service inline */}
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="border-primary/30">
              <CardContent>
                <h4 className="text-sm font-semibold text-text-primary mb-3">
                  {editingService ? 'Edit Service' : 'New Service'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Input
                    placeholder="Service name"
                    value={editingService ? editingService.name : newSvc.name}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, name: e.target.value })
                        : setNewSvc({ ...newSvc, name: e.target.value })
                    }
                  />
                  <Select
                    value={editingService ? editingService.category : newSvc.category}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, category: e.target.value })
                        : setNewSvc({ ...newSvc, category: e.target.value })
                    }
                  >
                    {['Hair', 'Skin', 'Nails', 'Men', 'Other'].map((c) => <option key={c}>{c}</option>)}
                  </Select>
                  <Input
                    placeholder="₹ Price"
                    value={editingService ? editingService.price : newSvc.price}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, price: e.target.value })
                        : setNewSvc({ ...newSvc, price: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Duration"
                    value={editingService ? editingService.duration : newSvc.duration}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, duration: e.target.value })
                        : setNewSvc({ ...newSvc, duration: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={handleCancelForm}>Cancel</Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={editingService ? handleUpdateService : handleAddService}
                  >
                    {editingService ? (
                      <>
                        <Check className="w-4 h-4" /> Update
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Tab: Working Hours ────────────────────────────────────────
const HoursTab = () => {
  const [hours, setHours] = useState(businessProfile.hours);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent>
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Weekly Schedule
          </h3>
          <div className="space-y-3">
            {DAYS.map((day) => {
              const h = hours[day] || { open: '09:00', close: '21:00', active: false };
              return (
                <div key={day} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${h.active ? 'border-border-light' : 'border-border-light/50 opacity-60'}`}>
                  <div className="w-12 text-sm font-medium text-text-primary">{day}</div>
                  <Toggle checked={h.active}
                    onChange={(v) => setHours({ ...hours, [day]: { ...h, active: v } })}
                    size="sm" />
                  {h.active ? (
                    <>
                      <input type="time" value={h.open}
                        onChange={(e) => setHours({ ...hours, [day]: { ...h, open: e.target.value } })}
                        className="bg-surface border border-border-light rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary" />
                      <span className="text-text-tertiary text-sm">to</span>
                      <input type="time" value={h.close}
                        onChange={(e) => setHours({ ...hours, [day]: { ...h, close: e.target.value } })}
                        className="bg-surface border border-border-light rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary" />
                    </>
                  ) : (
                    <span className="text-sm text-text-tertiary">Closed</span>
                  )}
                </div>
              );
            })}
          </div>
          <Button variant="primary" size="sm" className="mt-4">
            <Check className="w-4 h-4" /> Save Hours
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ── Tab: Photos ───────────────────────────────────────────────
const PhotosTab = () => {
  const photos = businessProfile.photos;
  return (
    <div className="space-y-5">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" /> Business Photos
            </h3>
            <Button variant="secondary" size="sm"><Plus className="w-4 h-4" /> Add Photo</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className="relative aspect-video rounded-xl overflow-hidden group border border-border-light">
                <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-xs text-white font-medium">{photo.label}</span>
                </div>
                <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-danger/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            {/* Upload placeholder */}
            <div className="aspect-video rounded-xl border-2 border-dashed border-border-light flex flex-col items-center justify-center gap-2 text-text-tertiary hover:border-primary/30 hover:text-primary cursor-pointer transition-colors">
              <Camera className="w-6 h-6" />
              <span className="text-xs">Upload</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardContent>
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Team Members
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {businessProfile.team.map((member, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className="p-4 bg-surface rounded-xl border border-border-light text-center">
                <Avatar name={member.name} size="lg" color="primary" className="mx-auto mb-2" />
                <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                <p className="text-xs text-text-secondary">{member.role}</p>
                <p className="text-2xs text-text-tertiary mt-1">{member.exp} experience</p>
              </motion.div>
            ))}
            <button className="p-4 rounded-xl border-2 border-dashed border-border-light flex flex-col items-center justify-center gap-2 text-text-tertiary hover:border-primary/30 hover:text-primary transition-colors">
              <Plus className="w-6 h-6" />
              <span className="text-xs">Add Member</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────
const BusinessProfile = () => {
  const [tab, setTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Business Profile</h2>
        <p className="text-sm text-text-secondary">Manage your business information and brand presence</p>
      </div>

      <Tabs
        tabs={[
          { value: 'general', label: 'General Info' },
          { value: 'services', label: 'Services' },
          { value: 'hours', label: 'Working Hours' },
          { value: 'photos', label: 'Photos & Team' },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === "general" && <GeneralInfo />}
          {tab === 'services' && <ServicesTab />}
          {tab === 'hours' && <HoursTab />}
          {tab === 'photos' && <PhotosTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BusinessProfile;