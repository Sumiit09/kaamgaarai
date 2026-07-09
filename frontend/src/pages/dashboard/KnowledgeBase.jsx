import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, BookOpen, Tag, Info, Upload, FileText, Sparkles, X } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input, { Textarea } from '../../components/ui/Input';
import { knowledgeBase } from '../../data/mockData';

const KnowledgeBase = () => {
  const [faqs, setFaqs] = useState(knowledgeBase.faqs);
  const [services, setServices] = useState(knowledgeBase.services);
  const [newFaq, setNewFaq] = useState({ q: '', a: '' });
  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });

  const addFaq = () => {
    if (!newFaq.q || !newFaq.a) return;
    setFaqs([...faqs, newFaq]);
    setNewFaq({ q: '', a: '' });
  };

  const addService = () => {
    if (!newService.name) return;
    setServices([...services, newService]);
    setNewService({ name: '', price: '', duration: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Knowledge Base</h2>
        <p className="text-sm text-text-secondary">Train your AI Employee with your business knowledge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-text-primary">FAQs</h3>
              <Badge variant="info" size="sm" className="ml-auto">{faqs.length} items</Badge>
            </div>
            <div className="space-y-2 mb-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-3 bg-surface rounded-lg border border-border-light">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{faq.q}</p>
                      <p className="text-xs text-text-secondary mt-1">{faq.a}</p>
                    </div>
                    <button onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} className="text-text-tertiary hover:text-danger transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2 p-3 bg-surface rounded-lg border border-border-light">
              <Input placeholder="Question" value={newFaq.q} onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })} />
              <Textarea placeholder="Answer" rows={2} value={newFaq.a} onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })} />
              <Button variant="secondary" size="sm" onClick={addFaq}><Plus className="w-4 h-4" /> Add FAQ</Button>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-accent" />
              <h3 className="text-base font-semibold text-text-primary">Services & Pricing</h3>
              <Badge variant="info" size="sm" className="ml-auto">{services.length} items</Badge>
            </div>
            <div className="space-y-2 mb-4">
              {services.map((svc, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border-light">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{svc.name}</p>
                    <p className="text-xs text-text-secondary">{svc.duration}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-success">{svc.price}</span>
                    <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="text-text-tertiary hover:text-danger transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2 p-3 bg-surface rounded-lg border border-border-light">
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="Service" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                <Input placeholder="₹ Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
                <Input placeholder="Duration" value={newService.duration} onChange={(e) => setNewService({ ...newService, duration: e.target.value })} />
              </div>
              <Button variant="secondary" size="sm" onClick={addService}><Plus className="w-4 h-4" /> Add Service</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Info */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-success" />
            <h3 className="text-base font-semibold text-text-primary">Business Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Business Name" defaultValue={knowledgeBase.businessInfo.name} />
            <Input label="Phone" defaultValue={knowledgeBase.businessInfo.phone} />
            <Input label="Address" defaultValue={knowledgeBase.businessInfo.address} className="sm:col-span-2" />
            <Input label="Working Hours" defaultValue={knowledgeBase.businessInfo.hours} />
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-warning" />
            <h3 className="text-base font-semibold text-text-primary">Upload Documents</h3>
            <Badge variant="neutral" size="sm" className="ml-auto">UI only</Badge>
          </div>
          <div className="border-2 border-dashed border-border-light rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-secondary mb-1">Drop files here or click to upload</p>
            <p className="text-xs text-text-tertiary">PDF, DOCX, TXT up to 10MB</p>
          </div>
          <div className="mt-4 space-y-2">
            {['Price_List_2024.pdf', 'Service_Menu.docx', 'Business_Policies.txt'].map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border-light">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-primary flex-1">{file}</span>
                <Badge variant="success" size="sm">Indexed</Badge>
                <button className="text-text-tertiary hover:text-danger transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Preview */}
      <Card className="gradient-border">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-text-primary">How AI Uses This</h3>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-border-light">
            <p className="text-sm text-text-secondary mb-3">When a customer asks "Facial ka price kya hai?", your AI will respond:</p>
            <div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm max-w-[80%]">
              Humare paas 2 facial options hain: Basic Facial (₹500, 45 min) aur Premium Facial (₹900, 60 min). Kaunsa chahiye aapko?
            </div>
            <p className="text-xs text-text-tertiary mt-3">AI uses your services, FAQs, and business info to generate accurate responses.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
