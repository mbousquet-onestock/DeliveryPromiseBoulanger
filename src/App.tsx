import React, { useState, useMemo } from 'react';
import { Plus, Search, X, Bell, Globe, Share2, DollarSign, Truck, Calendar, ChevronDown, MoreVertical, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, MOCK_ITEMS, SUPPLIER_DATA, HUB_DATA } from './constants';

interface Item {
  id: string;
  title: string;
  price: number;
  type: string;
  image: string;
  quantity?: number;
}

interface CalculatedMethod {
  name: string;
  status: string;
  reason: string;
  dateStart: string;
  dateEnd: string;
  cutoff: string;
  shipments: number;
  cost: string;
  carbon: string;
  fees: string;
  carrier: string;
  details: {
    suppliers: any[];
    hubs: any[];
  };
}

const AddItemModal = ({ isOpen, onClose, onAddMultiple }: { isOpen: boolean; onClose: () => void; onAddMultiple: (items: Item[]) => void }) => {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.id.includes(search)
    );
  }, [search]);

  const handleQtyChange = (id: string, val: string) => {
    const num = parseInt(val) || 1;
    setQuantities(prev => ({ ...prev, [id]: num }));
    if (!selectedIds.has(id)) {
      setSelectedIds(prev => new Set(prev).add(id));
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddSelected = () => {
    const itemsToAdd = MOCK_ITEMS
      .filter(item => selectedIds.has(item.id))
      .map(item => ({
        ...item,
        quantity: quantities[item.id] || 1
      }));
    
    if (itemsToAdd.length > 0) {
      onAddMultiple(itemsToAdd);
      setSelectedIds(new Set());
      setQuantities({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add items</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b">
          <label className="text-sm text-gray-500 mb-1 block">Search</label>
          <div className="relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] focus:border-transparent"
              placeholder="Search by name or ID..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {search ? (
                <X size={18} className="cursor-pointer" onClick={() => setSearch('')} />
              ) : (
                <Search size={18} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.map(item => {
            const isSelected = selectedIds.has(item.id);
            return (
              <div 
                key={item.id} 
                className={`border rounded-lg p-3 flex items-center gap-4 transition-colors cursor-pointer ${isSelected ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => toggleSelection(item.id)}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#26C2B9] border-[#26C2B9]' : 'border-gray-300 bg-white'}`}>
                  {isSelected && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded bg-white" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.id}</p>
                  <p className="text-xs text-gray-400">{item.type}</p>
                </div>
                <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Qty</span>
                    <input 
                      type="number"
                      min="1"
                      value={quantities[item.id] || 1}
                      onChange={(e) => handleQtyChange(item.id, e.target.value)}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[#26C2B9]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">No items found</div>
          )}
        </div>

        <div className="p-4 border-t flex justify-between items-center bg-gray-50 rounded-b-lg">
          <div className="text-sm text-gray-600">
            {selectedIds.size} item{selectedIds.size > 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 rounded font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddSelected}
              disabled={selectedIds.size === 0}
              className={`px-6 py-2 rounded font-medium transition-colors ${selectedIds.size > 0 ? 'bg-[#26C2B9] text-white hover:bg-[#1fa9a1]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Add selected items
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [salesChannel, setSalesChannel] = useState('France');
  const [destinationType, setDestinationType] = useState('address');
  const [country, setCountry] = useState('France');
  const [showResults, setShowResults] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [expandedSuppliers, setExpandedSuppliers] = useState<string[]>([]);
  const [expandedConsolidations, setExpandedConsolidations] = useState<string[]>([]);

  const calculateResults = useMemo(() => {
    if (selectedItems.length === 0) return [];
    
    const targetCountry = country || 'France';
    
    const findPaths = (itemId: string, destination: string) => {
      const paths: any[] = [];
      
      // Find suppliers for this item
      const suppliers = SUPPLIER_DATA.filter(s => s.itemId === itemId);
      
      suppliers.forEach(supplier => {
        supplier.routes.forEach(route => {
          // Direct route to country
          if (route.to === destination) {
            paths.push({
              supplier: supplier.name,
              steps: [
                { from: supplier.name, to: destination, ...route }
              ],
              totalCost: route.cost,
              totalHours: (route.transitHours || 0) + (route.transitDays || 0) * 24,
              totalCarbon: parseInt(route.carbon) || 0
            });
          }
          
          // Route via Hub
          const hub = HUB_DATA.find(h => h.name === route.to);
          if (hub) {
            hub.routes.forEach(hubRoute => {
              if (hubRoute.to === destination) {
                paths.push({
                  supplier: supplier.name,
                  steps: [
                    { from: supplier.name, to: hub.name, ...route },
                    { from: hub.name, to: destination, ...hubRoute }
                  ],
                  totalCost: route.cost + hubRoute.cost,
                  totalHours: (route.transitHours || 0) + (route.transitDays || 0) * 24 + (hubRoute.transitHours || 0) + (hubRoute.transitDays || 0) * 24,
                  totalCarbon: (parseInt(route.carbon) || 0) + (parseInt(hubRoute.carbon) || 0)
                });
              }
            });
          }

          // Route via another Supplier (e.g. Supplier 1 -> Supplier 2 -> France)
          const nextSupplier = SUPPLIER_DATA.find(s => s.name === route.to);
          if (nextSupplier) {
            nextSupplier.routes.forEach(nsRoute => {
              if (nsRoute.to === destination) {
                paths.push({
                  supplier: supplier.name,
                  steps: [
                    { from: supplier.name, to: nextSupplier.name, ...route },
                    { from: nextSupplier.name, to: destination, ...nsRoute }
                  ],
                  totalCost: route.cost + nsRoute.cost,
                  totalHours: (route.transitHours || 0) + (route.transitDays || 0) * 24 + (nsRoute.transitHours || 0) + (nsRoute.transitDays || 0) * 24,
                  totalCarbon: (parseInt(route.carbon) || 0) + (parseInt(nsRoute.carbon) || 0)
                });
              }
            });
          }
        });
      });
      
      return paths;
    };

    const getMethodResult = (name: string, pathSelector: (paths: any[]) => any, feeMultiplier: number) => {
      const itemPaths = selectedItems.map(item => ({
        item,
        path: pathSelector(findPaths(item.id, targetCountry))
      }));

      if (!itemPaths.every(p => p.path)) return null;

      // Calculate Promise cut-off based on the first leg of each item
      const firstLegCutoffs = itemPaths.map(p => {
        const firstStep = p.path.steps[0];
        if (firstStep.cutoffs && firstStep.cutoffs.length > 0) return firstStep.cutoffs[0];
        return firstStep.cutoff || null;
      }).filter(Boolean);

      const methodCutoff = firstLegCutoffs.length > 0 
        ? firstLegCutoffs.reduce((earliest, current) => {
            if (!earliest) return current;
            return current < earliest ? current : earliest;
          })
        : (name === 'Standard' ? '18:00' : '20:00');

      // Deduplicate legs globally across all items and steps
      const uniqueLegs = new Map<string, any>();
      
      itemPaths.forEach(({ item, path }) => {
        const originSupplier = path.steps[0].from;
        path.steps.forEach((step: any, index: number) => {
          const key = `${step.from}->${step.to}`;
          const supplierInfo = SUPPLIER_DATA.find(s => s.name === step.from && s.itemId === item.id);
          const purchasePrice = supplierInfo?.purchasePrice || item.price;
          const enrichedItem = { ...item, price: purchasePrice, originSupplier };

          if (!uniqueLegs.has(key)) {
            uniqueLegs.set(key, { 
              ...step, 
              items: [], 
              isHubLeg: index > 0,
              legCost: step.cost,
              legCarbon: parseInt(step.carbon) || 0
            });
          } else if (index > 0) {
            // If this leg is used as a hub leg at least once, mark it as such
            uniqueLegs.get(key)!.isHubLeg = true;
          }
          
          // Add item to this leg's list if not already there
          if (!uniqueLegs.get(key)!.items.find((i: any) => i.id === item.id)) {
            uniqueLegs.get(key)!.items.push(enrichedItem);
          }
        });
      });

      // Standard mode merge logic: if a supplier is also a hub, merge its direct items into the hub leg
      if (name === 'Standard') {
        const hubNames = new Set(Array.from(uniqueLegs.values()).filter(l => l.isHubLeg).map(l => l.from));
        uniqueLegs.forEach((leg, key) => {
          if (!leg.isHubLeg && leg.to === targetCountry && hubNames.has(leg.from)) {
            // This is a direct supplier leg from someone who is also a hub
            const hubLeg = Array.from(uniqueLegs.values()).find(l => l.isHubLeg && l.from === leg.from);
            if (hubLeg) {
              leg.items.forEach((item: any) => {
                if (!hubLeg.items.find((hi: any) => hi.id === item.id)) {
                  hubLeg.items.push(item);
                }
              });
              leg.mergedIntoHub = true;
            }
          }
        });
      }

      const totalTransportCost = Array.from(uniqueLegs.values()).reduce((sum, l) => sum + l.legCost, 0);
      const totalCarbon = Array.from(uniqueLegs.values()).reduce((sum, l) => sum + l.legCarbon, 0);
      const maxHours = Math.max(...itemPaths.map(p => p.path.totalHours));
      
      // Shipments = number of legs arriving at destination
      const shipments = Array.from(uniqueLegs.values()).filter(l => l.to === targetCountry).length;

      return {
        name,
        status: 'Valid',
        reason: 'Success',
        dateStart: new Date(Date.now() + (maxHours - 12) * 3600000).toLocaleString(),
        dateEnd: new Date(Date.now() + maxHours * 3600000).toLocaleString(),
        cutoff: methodCutoff,
        shipments,
        cost: `${totalTransportCost.toFixed(2)} EUR`,
        carbon: `${totalCarbon}g`,
        fees: `${(totalTransportCost * feeMultiplier).toFixed(2)} EUR`,
        carrier: Array.from(uniqueLegs.values()).find(l => l.to === targetCountry)?.carrier || 'Geodis',
        details: {
          suppliers: Array.from(uniqueLegs.values())
            .filter(l => !l.isHubLeg && !l.mergedIntoHub && l.to === targetCountry)
            .map(l => ({
              name: l.from,
              items: l.items,
              cost: l.legCost,
              carbon: `${l.legCarbon}g`,
              fees: `${(l.legCost * feeMultiplier).toFixed(2)} EUR`,
              date: new Date(Date.now() + (l.transitHours || 0) * 3600000).toLocaleString(),
              cutoff: l.cutoffs ? l.cutoffs[0] : (l.cutoff || '-'),
              direct: l.to === targetCountry,
              carrier: l.carrier,
              consolidation: l.to !== targetCountry ? l.to : null
            })),
          hubs: Array.from(uniqueLegs.values())
            .filter(l => l.isHubLeg)
            .map(l => ({
              name: l.from,
              items: l.items,
              cost: l.legCost,
              carbon: `${l.legCarbon}g`,
              fees: `${(l.legCost * feeMultiplier).toFixed(2)} EUR`,
              carrier: l.carrier,
              cutoff: l.cutoff
            }))
        }
      };
    };

    const results: CalculatedMethod[] = [];
    
    const standard = getMethodResult(
      'Standard', 
      (paths) => paths.sort((a, b) => a.totalCost - b.totalCost)[0], 
      1.0
    );
    if (standard) {
      results.push(standard);
      
      // Montage & Installation mode
      const montage = JSON.parse(JSON.stringify(standard));
      montage.name = 'Montage & Installation';
      const additionalAmount = standard.shipments * 100;
      const baseCost = parseFloat(standard.cost.replace(' EUR', ''));
      montage.cost = `${(baseCost + additionalAmount).toFixed(2)} EUR`;
      const baseFees = parseFloat(standard.fees.replace(' EUR', ''));
      montage.fees = `${(baseFees + additionalAmount).toFixed(2)} EUR`;
      
      // Update individual shipment details
      if (montage.details && montage.details.suppliers) {
        montage.details.suppliers = montage.details.suppliers.map((sup: any) => ({
          ...sup,
          cost: (parseFloat(sup.cost) + 100),
          fees: `${(parseFloat(sup.fees.replace(' EUR', '')) + 100).toFixed(2)} EUR`
        }));
      }
      results.push(montage);
    }

    return results;
  }, [selectedItems, country]);

  const toggleRow = (method: string) => {
    setExpandedRows(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const toggleSupplier = (supplierId: string) => {
    setExpandedSuppliers(prev => 
      prev.includes(supplierId) ? prev.filter(s => s !== supplierId) : [...prev, supplierId]
    );
  };

  const toggleConsolidation = (consolidationId: string) => {
    setExpandedConsolidations(prev => 
      prev.includes(consolidationId) ? prev.filter(c => c !== consolidationId) : [...prev, consolidationId]
    );
  };

  const handleAddItems = (items: Item[]) => {
    setSelectedItems(prev => {
      const next = [...prev];
      items.forEach(newItem => {
        const existingIdx = next.findIndex(i => i.id === newItem.id);
        if (existingIdx >= 0) {
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: (next[existingIdx].quantity || 0) + (newItem.quantity || 0)
          };
        } else {
          next.push(newItem);
        }
      });
      return next;
    });
    setIsModalOpen(false);
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900">
      <div className="max-w-[98%] mx-auto px-2 py-4 md:px-4 space-y-6">
        
        {/* Item Section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Item</h2>
          <div className="flex flex-wrap gap-4">
            {selectedItems.map(item => (
              <div key={item.id} className="relative bg-white border border-gray-200 rounded-lg p-4 w-40 flex flex-col items-center text-center shadow-sm">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                  <X size={12} />
                </button>
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mb-2" referrerPolicy="no-referrer" />
                <p className="text-xs font-medium text-gray-800 line-clamp-2">{item.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">Qty: {item.quantity}</p>
              </div>
            ))}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center gap-2 hover:border-[#26C2B9] hover:bg-gray-50 transition-all group"
            >
              <div className="bg-gray-100 p-3 rounded-full group-hover:bg-[#26C2B9]/10 transition-colors">
                <Plus size={32} className="text-gray-400 group-hover:text-[#26C2B9]" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-[#26C2B9]">Add an item</span>
            </button>
          </div>
        </section>

        {/* Options Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Options</h2>
          
          {/* Sales Channel */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex gap-4">
            <div className="bg-[#26C2B9]/10 p-3 rounded-full h-fit">
              <Share2 size={20} className="text-[#26C2B9]" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">Sales Channel</h3>
                <p className="text-sm text-gray-500">Specify the sales channel to use</p>
              </div>
              <div className="max-w-xs">
                <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Sales channels</label>
                <div className="relative">
                  <select 
                    value={salesChannel}
                    onChange={(e) => setSalesChannel(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] focus:border-transparent text-sm"
                  >
                    <option>Suisse</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Italy</option>
                    <option>Poland</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex gap-4">
            <div className="bg-[#26C2B9]/10 p-3 rounded-full h-fit">
              <Globe size={20} className="text-[#26C2B9]" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Destination</h3>
                <p className="text-sm text-gray-500">Specify the destination</p>
              </div>
              
              <div className="space-y-3">
                {/* Address Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'address' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'address'} 
                      onChange={() => setDestinationType('address')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Adresse</span>
                  </label>
                  
                  {destinationType === 'address' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Pays</label>
                        <div className="relative">
                          <select 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm"
                          >
                            <option value="">Sélectionner un pays</option>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Zip code (optional)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm" />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Region (optional)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Timezone (required if set in destination zone)</label>
                        <div className="relative">
                          <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm">
                            <option>Select a timezone</option>
                            <option>UTC+01:00 (Zurich)</option>
                            <option>UTC+00:00 (London)</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'zone' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'zone'} 
                      onChange={() => setDestinationType('zone')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Zone</span>
                  </label>
                </div>

                {/* Stock Location Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'stock' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'stock'} 
                      onChange={() => setDestinationType('stock')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Stock location</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Other Options (Price, Delivery, Date) */}
          {[
            { icon: Truck, title: 'Delivery method', desc: 'Limit the test to one or multiple delivery methods' },
            { icon: Calendar, title: 'Date and time', desc: 'Simulate a test at a given date and time in the future' },
          ].map((opt, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <opt.icon size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{opt.title}</h3>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
              <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Add
              </button>
            </div>
          ))}
        </section>

        {/* Action Button */}
        <div className="flex justify-center pt-8">
          <button 
            onClick={() => setShowResults(true)}
            className="bg-[#26C2B9] text-white px-12 py-3 rounded-full font-bold shadow-lg shadow-[#26C2B9]/30 hover:bg-[#1fa9a1] transition-all transform hover:scale-105 active:scale-95"
          >
            Test the delivery promise
          </button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-8 border-t border-gray-200"
            >
              {/* Result Badges */}
              <div className="flex flex-wrap gap-2">
                {selectedItems.map(item => (
                  <span key={item.id} className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                    {item.id}
                  </span>
                ))}
                <span className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                  {salesChannel}
                </span>
                <span className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                  Adresse : {country || 'France'}
                </span>
              </div>

              {/* Result Table */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-end items-center gap-2 text-xs text-gray-500">
                  <span>1 - 2 out of 2</span>
                  <button className="hover:bg-gray-100 p-1 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-y border-gray-100 text-gray-400 font-medium">
                        <th className="px-4 py-3 font-medium w-10"></th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery method <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Status <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Reason <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery date (start of delivery slot) <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery date <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Promise cut-off <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Number of shipments <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Transportation cost <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Carbon footprint <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Shipping fees <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Carrier <ChevronDown size={12} />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      {calculateResults.map((method) => (
                        <React.Fragment key={method.name}>
                          <tr 
                            className={`hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer ${expandedRows.includes(method.name) ? 'bg-gray-50' : ''}`}
                            onClick={() => toggleRow(method.name)}
                          >
                            <td className="px-4 py-4">
                              <ChevronRight 
                                size={16} 
                                className={`transition-transform ${expandedRows.includes(method.name) ? 'rotate-90' : ''}`} 
                              />
                            </td>
                            <td className="px-4 py-4 font-medium">{method.name}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/10" />
                                <span className="text-emerald-600 font-medium">{method.status}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-gray-400">{method.reason}</td>
                            <td className="px-4 py-4 text-center">{method.dateStart}</td>
                            <td className="px-4 py-4 text-center">{method.dateEnd}</td>
                            <td className="px-4 py-4 text-center font-mono">{method.cutoff}</td>
                            <td className="px-4 py-4 text-center">{method.shipments}</td>
                            <td className="px-4 py-4 text-center font-medium">{method.cost}</td>
                            <td className="px-4 py-4 text-center text-gray-400">{method.carbon}</td>
                            <td className="px-4 py-4 text-center">{method.fees}</td>
                            <td className="px-4 py-4 text-center">
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{method.carrier}</span>
                            </td>
                          </tr>
                          {expandedRows.includes(method.name) && (
                            <tr className="bg-gray-50/50">
                              <td colSpan={12} className="px-8 py-4">
                                <div className="space-y-4">
                                  {/* Suppliers */}
                                  {method.details.suppliers.map((sup, idx) => {
                                    const supplierId = `${method.name}-${sup.name}-${idx}`;
                                    const isExpanded = expandedSuppliers.includes(supplierId);
                                    const totalPurchasePrice = sup.items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);

                                    return (
                                      <div key={supplierId} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                                        <table className="w-full text-left text-[10px]">
                                          <thead>
                                            <tr className="bg-gray-50 text-gray-400 border-b border-gray-100">
                                              <th className="px-4 py-2 w-8"></th>
                                              <th className="px-4 py-2 font-medium">Parcel</th>
                                              <th className="px-4 py-2 font-medium">Delivery date</th>
                                              <th className="px-4 py-2 font-medium">Promise cut-off</th>
                                              <th className="px-4 py-2 font-medium">Carbon footprint</th>
                                              <th className="px-4 py-2 font-medium">Shipping fees</th>
                                              <th className="px-4 py-2 font-medium">Carrier</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr 
                                              className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer"
                                              onClick={() => toggleSupplier(supplierId)}
                                            >
                                              <td className="px-4 py-2">
                                                <ChevronRight 
                                                  size={12} 
                                                  className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                                                />
                                              </td>
                                              <td className="px-4 py-2 font-semibold text-gray-700">Parcel {idx + 1}</td>
                                              <td className="px-4 py-2">{sup.date}</td>
                                              <td className="px-4 py-2">{sup.cutoff}</td>
                                              <td className="px-4 py-2">{sup.carbon}</td>
                                              <td className="px-4 py-2">{sup.fees}</td>
                                              <td className="px-4 py-2">
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">{sup.carrier || 'Geodis'}</span>
                                              </td>
                                            </tr>
                                            {isExpanded && (
                                              <tr className="bg-gray-50/30">
                                                <td colSpan={8} className="px-8 py-2">
                                                  <div className="text-[9px] font-semibold text-gray-400 mb-1 uppercase">Articles</div>
                                                  <table className="w-full text-left text-[9px] border border-gray-100 rounded">
                                                    <thead>
                                                      <tr className="bg-gray-100/50 text-gray-500">
                                                        <th className="px-3 py-1 font-medium">Article ID</th>
                                                        <th className="px-3 py-1 font-medium">Quantity</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {sup.items.map((item: any, iIdx: number) => (
                                                        <tr key={iIdx} className="border-b border-gray-50 last:border-0 bg-white">
                                                          <td className="px-3 py-1">{item.id}</td>
                                                          <td className="px-3 py-1">{item.quantity}</td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    );
                                  })}

                                  {/* Hubs */}
                                  {method.details.hubs.map((hub, idx) => {
                                    const hubId = `${method.name}-hub-${hub.name}-${idx}`;
                                    const isExpanded = expandedConsolidations.includes(hubId);

                                    return (
                                      <div key={hubId} className="bg-white border border-blue-100 rounded-lg overflow-hidden shadow-sm">
                                        <table className="w-full text-left text-[10px]">
                                          <thead>
                                            <tr className="bg-blue-50 text-blue-600 border-b border-blue-100">
                                              <th className="px-4 py-2 w-8"></th>
                                              <th className="px-4 py-2 font-medium">Parcel</th>
                                              <th className="px-4 py-2 font-medium">Delivery date (start)</th>
                                              <th className="px-4 py-2 font-medium">Delivery date</th>
                                              <th className="px-4 py-2 font-medium">Carrier</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr 
                                              className="border-b border-blue-50 hover:bg-blue-50/50 cursor-pointer"
                                              onClick={() => toggleConsolidation(hubId)}
                                            >
                                              <td className="px-4 py-2">
                                                <ChevronRight 
                                                  size={12} 
                                                  className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                                                />
                                              </td>
                                              <td className="px-4 py-2 font-semibold">Parcel {method.details.suppliers.length + idx + 1}</td>
                                              <td className="px-4 py-2">{method.dateStart}</td>
                                              <td className="px-4 py-2">{method.dateEnd}</td>
                                              <td className="px-4 py-2">
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">{hub.carrier || method.carrier}</span>
                                              </td>
                                            </tr>
                                            {isExpanded && (
                                              <tr className="bg-gray-50/30">
                                                <td colSpan={5} className="px-8 py-2">
                                                  <div className="text-[9px] font-semibold text-gray-400 mb-1 uppercase">Articles</div>
                                                  <table className="w-full text-left text-[9px] border border-gray-100 rounded">
                                                    <thead>
                                                      <tr className="bg-gray-100/50 text-gray-500">
                                                        <th className="px-3 py-1 font-medium">Article ID</th>
                                                        <th className="px-3 py-1 font-medium">Quantity</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {hub.items.map((item: any, iIdx: number) => (
                                                        <tr key={iIdx} className="border-b border-gray-50 last:border-0 bg-white">
                                                          <td className="px-3 py-1">{item.id}</td>
                                                          <td className="px-3 py-1">{item.quantity}</td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    );
                                  })}

                                  {calculateResults.length === 0 && (
                                    <div className="bg-white border border-gray-100 rounded-lg p-8 text-center text-gray-400 text-[10px]">
                                      No delivery routes found for this destination
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 flex justify-end items-center gap-2 text-xs text-gray-500 border-t border-gray-100">
                  <span>1 - 2 out of 2</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Notification Bell */}
      <button className="fixed bottom-6 right-6 bg-[#26C2B9] text-white p-4 rounded-full shadow-xl hover:bg-[#1fa9a1] transition-all transform hover:scale-110">
        <Bell size={24} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddItemModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAddMultiple={handleAddItems} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
